/* eslint-disable require-jsdoc */
import Renderer from './Renderer'
import Camera from './Camera'
import Entity from './Entity'
import Keyboard from './Keyboard'
import Events from './Events'
import Animation from './Animation'
import Config from './Config'
import Collider from './Collider'
import Floor from './Floor'
import Cube from './Cube'
import LightSource from './LightSource'

import darthVaderMD2 from './assets/DarthVader.md2'
import darthMaulMD2 from './assets/DarthMaul.md2'
import darthVaderTex from './assets/DarthVader.jpg'
import darthMaulTex from './assets/DarthMaul.jpg'
import wallTex from './assets/wall.bmp'
import treasureTex from './assets/treasure.jpg'

import Stats from 'three/examples/jsm/libs/stats.module.js'
import {
    LoadingManager,
    Clock,
    Vector3,
    Raycaster,
    Ray,
    AxesHelper,
    Scene,
    // AmbientLight
} from 'three'

export default class Main {
    constructor(container, map) {
        Events()
        this.size = 140
        this.collides = false
        this.isLoaded = null
        this.animation = null
        this.animTime = 0

        this.container = container

        this.scene = new Scene()
        this.raycaster = new Raycaster()
        this.renderer = new Renderer(this.scene, container)
        this.camera = new Camera(this.renderer.threeRenderer)
        this.clock = new Clock()
        this.manager = new LoadingManager()

        this.stats = new Stats()
        this.stats.showPanel(0)

        document.body.appendChild(this.stats.dom)
        document.getElementById('shots').innerText = '0'
        document.getElementById('hits').innerText = '0'
        document.getElementById('accuracy').innerText = '0%'
        document.getElementById('treasures').innerText = '0'

        this.cubeArray = []
        this.enemyArray = []
        this.lightArray = []
        this.treasureArray = []

        this.collider = new Collider(this.size, 0, 1)
        this.scene.add(this.collider)

        this.player = new Entity(this.scene, this.manager, darthVaderTex, this.size, 0, 1)
        this.player.load(darthVaderMD2)

        this.axesHelper = new AxesHelper(100)
        this.axesHelper.position.z = this.size
        this.scene.add(this.axesHelper)

        let floor = new Floor(this.size)
        this.scene.add(floor)
        floor = new Floor(this.size)
        floor.position.y = this.size
        this.scene.add(floor)

        map.forEach(element => {
            if (element.type === 'enemy') {
                let enemy = new Entity(this.scene, this.manager, darthMaulTex, this.size, element.x, element.z)
                enemy.load(darthMaulMD2)
                this.enemyArray.push( { enemy: enemy, animation: null, ray: null })
            } else {
                let el
                switch (element.type) {
                case 'wall':
                    el = new Cube(this.size, element.x, element.z, wallTex, false)
                    this.cubeArray.push(el)
                    this.scene.add(el)
                    break
                case 'treasure':
                    el = new Cube(this.size / 2, element.x, element.z, treasureTex, true)
                    this.treasureArray.push(el)
                    this.scene.add(el)
                    break
                case 'light':
                    this.lightArray.push(new LightSource(this.scene, this.size, element.x, element.z))
                    break
                default:
                    console.error('Unsupported type!')
                    break
                }
            }
        })

        this.manager.onLoad = () => {
            this.isLoaded = true
            this.animation = new Animation(this.player.mesh)
            this.animation.playAnim('Stand')
            this.keyboard = new Keyboard(window, this.animation, this.player.mesh)

            for (let i in this.enemyArray) {
                let animation = new Animation(this.enemyArray[i].enemy.mesh)
                animation.playAnim('stand')
                this.enemyArray[i].animation = animation
            }

            this.mapped = this.enemyArray.map(a => a = a.enemy.mesh)
            console.log(this.mapped)
        }

        this.render()
    }

    detectCollisions(object1, object2){
        object1.geometry.computeBoundingBox()
        object2.geometry.computeBoundingBox()
        object1.updateMatrixWorld()
        object2.updateMatrixWorld()

        let box1 = object1.geometry.boundingBox.clone()
        box1.applyMatrix4(object1.matrixWorld)

        let box2 = object2.geometry.boundingBox.clone()
        box2.applyMatrix4(object2.matrixWorld)

        return box1.intersectsBox(box2)
    }

    render() {
        this.stats.begin()
        this.renderer.render(this.scene, this.camera.threeCamera)

        let delta = this.clock.getDelta()
        if (this.animation) this.animation.update(delta)

        for (let i in this.enemyArray) {
            if (this.enemyArray[i].animation) this.enemyArray[i].animation.update(delta)
        }

        if (this.player.mesh) {
            const camVect = new Vector3(-200 * (Config.cameraX + 1), 40 * (Config.cameraY + 1), 0)
            const camPos = camVect.applyMatrix4(this.player.mesh.matrixWorld)

            this.camera.threeCamera.position.x = camPos.x
            this.camera.threeCamera.position.y = camPos.y
            this.camera.threeCamera.position.z = camPos.z

            this.camera.threeCamera.lookAt(this.player.mesh.position)

            document.getElementById('collision').innerText = 'false'
            this.collides = false

            for (let i in this.cubeArray) {
                if (this.cubeArray[i] !== null && this.detectCollisions(this.collider, this.cubeArray[i])) {
                    document.getElementById('collision').innerText = 'true'
                    this.collides = true
                    break
                }
            }

            for (let i in this.treasureArray) {
                if (this.detectCollisions(this.collider, this.treasureArray[i])) {
                    document.getElementById('treasures').innerText =
                        parseInt(document.getElementById('treasures').innerText) + 1
                    this.scene.remove(this.treasureArray[i])
                    this.treasureArray.splice(i, 1)
                    break
                }
            }

            for (let i in this.lightArray) {
                this.lightArray[i].update()
            }

            if (this.mapped) {
                let ray = new Ray(
                    this.player.mesh.getWorldPosition(new Vector3()),
                    this.player.mesh.getWorldDirection(new Vector3()).applyAxisAngle(new Vector3(0, 1, 0), Math.PI / 2)
                )

                this.raycaster.ray = ray

                let intersects = this.raycaster.intersectObjects(this.mapped)

                for (let i in this.enemyArray) {
                    this.enemyArray[i].enemy.mesh.lookAt(this.player.mesh.position)

                    for (let j in intersects) {
                        if (intersects[j].object.uuid == this.enemyArray[i].enemy.mesh.uuid) {
                            this.enemyArray[i].enemy.unload(Config.attack)
                            if (Config.attack) { 
                                this.enemyArray.splice(i, 1)
                            }
                        }
                    }
                }
            }

            if (!Config.attack) {
                if (Config.rotateLeft) {
                    this.player.mesh.rotation.y += 0.03
                    this.axesHelper.rotation.y += 0.03
                    this.collider.rotation.y += 0.03
                }
                if (Config.rotateRight) {
                    this.player.mesh.rotation.y -= 0.03
                    this.axesHelper.rotation.y -= 0.03
                    this.collider.rotation.y -= 0.03
                }
                if (Config.moveForward && (!this.collides || Config.noClip)) {
                    this.player.mesh.translateX(Config.run ? 2 : 1)
                    this.axesHelper.translateX(Config.run ? 2 : 1)
                    this.collider.translateX(Config.run ? 2 : 1)
                } else if (Config.moveForward && (this.collides && !Config.noClip)) {
                    this.player.mesh.translateX(-0.1)
                    this.axesHelper.translateX(-0.1)
                    this.collider.translateX(-0.1)
                }
                if (Config.moveBackward && (!this.collides || Config.noClip)) {
                    this.player.mesh.translateX(Config.run ? -2 : -1)
                    this.axesHelper.translateX(Config.run ? -2 : -1)
                    this.collider.translateX(Config.run ? -2 : -1)
                } else if (Config.moveBackward && (this.collides && !Config.noClip)) {
                    this.player.mesh.translateX(0.1)
                    this.axesHelper.translateX(0.1)
                    this.collider.translateX(0.1)
                }
            } else {
                this.animTime += delta
                if (this.animTime >= 0.8) {
                    if ((Config.moveForward || Config.moveBackward) && !Config.run)
                        this.animation.playAnim('CrWalk')
                    else if ((Config.moveForward || Config.moveBackward) && Config.run)
                        this.animation.playAnim('Run')
                    else this.animation.playAnim('Stand')

                    this.animTime = 0
                    Config.attack = false
                }
                document.getElementById('accuracy').innerText = parseInt(
                    parseFloat(document.getElementById('hits').innerText) /
                    parseFloat(document.getElementById('shots').innerText) * 100
                ) + '%'
            }
        }

        if (this.treasureArray.length === 0 && this.enemyArray.length === 0) {
            document.getElementById('score-shots').innerText =
                document.getElementById('shots').innerText
            document.getElementById('score-hits').innerText =
                document.getElementById('hits').innerText
            document.getElementById('score-accuracy').innerText =
                document.getElementById('accuracy').innerText
            document.getElementById('score-treasures').innerText =
                document.getElementById('treasures').innerText
            document.getElementById('victory').style.display = 'block'
            return
        }

        this.stats.end()

        requestAnimationFrame(this.render.bind(this))
    }
}