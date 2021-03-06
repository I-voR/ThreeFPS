/* eslint-disable require-jsdoc */
let mapa = [{ "id": "0-0", "x": 0, "z": 0, "type": "wall" }, { "id": "0-1", "x": 1, "z": 0, "type": "wall" }, { "id": "0-2", "x": 2, "z": 0, "type": "wall" }, { "id": "0-3", "x": 3, "z": 0, "type": "wall" }, { "id": "0-4", "x": 4, "z": 0, "type": "wall" }, { "id": "0-5", "x": 5, "z": 0, "type": "wall" }, { "id": "0-6", "x": 6, "z": 0, "type": "wall" }, { "id": "0-7", "x": 7, "z": 0, "type": "wall" }, { "id": "0-8", "x": 8, "z": 0, "type": "wall" }, { "id": "0-9", "x": 9, "z": 0, "type": "wall" }, { "id": "1-0", "x": 0, "z": 1, "type": "wall" }, { "id": "1-1", "x": 1, "z": 1, "type": "light" }, { "id": "1-8", "x": 8, "z": 1, "type": "light" }, { "id": "1-9", "x": 9, "z": 1, "type": "wall" }, { "id": "2-0", "x": 0, "z": 2, "type": "wall" }, { "id": "2-2", "x": 2, "z": 2, "type": "light" }, { "id": "2-7", "x": 7, "z": 2, "type": "light" }, { "id": "2-9", "x": 9, "z": 2, "type": "wall" }, { "id": "3-0", "x": 0, "z": 3, "type": "wall" }, { "id": "3-6", "x": 6, "z": 3, "type": "enemy" }, { "id": "3-9", "x": 9, "z": 3, "type": "wall" }, { "id": "4-0", "x": 0, "z": 4, "type": "wall" }, { "id": "4-6", "x": 6, "z": 4, "type": "treasure" }, { "id": "4-9", "x": 9, "z": 4, "type": "wall" }, { "id": "5-0", "x": 0, "z": 5, "type": "wall" }, { "id": "5-6", "x": 6, "z": 5, "type": "treasure" }, { "id": "5-9", "x": 9, "z": 5, "type": "wall" }, { "id": "6-0", "x": 0, "z": 6, "type": "wall" }, { "id": "6-6", "x": 6, "z": 6, "type": "enemy" }, { "id": "6-9", "x": 9, "z": 6, "type": "wall" }, { "id": "7-0", "x": 0, "z": 7, "type": "wall" }, { "id": "7-2", "x": 2, "z": 7, "type": "light" }, { "id": "7-7", "x": 7, "z": 7, "type": "light" }, { "id": "7-9", "x": 9, "z": 7, "type": "wall" }, { "id": "8-0", "x": 0, "z": 8, "type": "wall" }, { "id": "8-1", "x": 1, "z": 8, "type": "light" }, { "id": "8-8", "x": 8, "z": 8, "type": "light" }, { "id": "8-9", "x": 9, "z": 8, "type": "wall" }, { "id": "9-0", "x": 0, "z": 9, "type": "wall" }, { "id": "9-1", "x": 1, "z": 9, "type": "wall" }, { "id": "9-2", "x": 2, "z": 9, "type": "wall" }, { "id": "9-3", "x": 3, "z": 9, "type": "wall" }, { "id": "9-4", "x": 4, "z": 9, "type": "wall" }, { "id": "9-5", "x": 5, "z": 9, "type": "wall" }, { "id": "9-6", "x": 6, "z": 9, "type": "wall" }, { "id": "9-7", "x": 7, "z": 9, "type": "wall" }, { "id": "9-8", "x": 8, "z": 9, "type": "wall" }, { "id": "9-9", "x": 9, "z": 9, "type": "wall" }]

import Renderer from './Renderer'
import Camera from './Camera'
import Player from './Player'
import Enemy from './Enemy'
import Keyboard from './Keyboard'
import Animation from './Animation'
import Config from './Config'
import Collider from './Collider'
import Floor from './Floor'
import Cube from './Cube'
import darthVaderMD2 from './assets/DarthVader.md2'
import darthMaulMD2 from './assets/DarthMaul.md2'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    Raycaster,
    Ray,
    AxesHelper,
    Scene,
    RepeatWrapping,
    TextureLoader,
    BoxGeometry,
    MeshPhongMaterial,
    Mesh,
    PointLight
} from 'three'

export default class Main {
    constructor(container) {
        this.size = 70
        this.collides = false
        this.isLoaded = null
        this.animation = null
        this.animationArray = []
        this.animTime = 0

        this.container = container
        this.scene = new Scene()
        this.renderer = new Renderer(this.scene, container)
        this.camera = new Camera(this.renderer.threeRenderer)

        this.collider = new Collider()
        this.scene.add(this.collider)

        document.getElementById('shots').innerText = '0'
        document.getElementById('hits').innerText = '0'
        document.getElementById('accuracy').innerText = '0'

        this.axesHelper = new AxesHelper(100)
        this.scene.add(this.axesHelper)

        this.wallArray = []
        this.enemyArray = []
        this.lightArray = []
        this.treasureArray = []

        let floor = new Floor(this.size)
        this.scene.add(floor)
        floor = new Floor(this.size)
        floor.position.set(this.size * 4.5, this.size / 2, this.size * 4.5)
        this.scene.add(floor)

        const wallTexture = new TextureLoader().load("./src/components/assets/wall.jpg")
        const treasureTexture = new TextureLoader().load("./src/components/assets/treasure.jpg")
        //wallTexture.wrapS = RepeatWrapping;
        //wallTexture.wrapT = RepeatWrapping;
        //wallTexture.repeat.set(1, 1, 1, 1, 1, 1);


        mapa.forEach(element => {
            let item
            let wallGeometry
            let treasureGeometry
            switch (element.type) {
                case 'enemy':
                    item = new Enemy(this.scene, this.manager, this.size, element.x, element.z)
                    item.load(darthMaulMD2)
                    this.enemyArray.push(item)
                    break
                case 'wall':
                    const wallMaterial = new MeshPhongMaterial({ map: wallTexture });
                    wallGeometry = new BoxGeometry(this.size, this.size, this.size)
                    item = new Mesh(wallGeometry, wallMaterial);
                    item.position.set(element.x * this.size, 0, element.z * this.size)
                    console.log(item)
                    this.wallArray.push(item)
                    this.scene.add(item)
                    break
                case 'treasure':
                    const treasureMaterial = new MeshPhongMaterial({ map: treasureTexture });
                    treasureGeometry = new BoxGeometry(this.size / 2, this.size / 2, this.size / 2)
                    item = new Mesh(treasureGeometry, treasureMaterial);
                    item.position.set(element.x * this.size, -this.size / 4, element.z * this.size)
                    console.log(item)
                    this.wallArray.push(item)
                    this.scene.add(item)
                    break
                case 'light':
                    item = new PointLight(0xffffff, 0.1);
                    item.position.set(element.x * this.size, 0, element.z * this.size)
                    this.lightArray.push(item)
                    this.scene.add(item)
                    break
                default:
                    console.log('Unsupported type!')
                    break
            }


        })

        this.stats = new Stats()
        this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb

        document.body.appendChild(this.stats.dom)

        this.clock = new Clock()
        this.manager = new LoadingManager()

        this.player = new Player(this.scene, this.manager)
        this.player.load(darthVaderMD2)

        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`)
        }

        this.manager.onLoad = () => {
            this.isLoaded = true
            this.animation = new Animation(this.player.mesh)
            this.animation.playAnim('Stand')
            this.keyboard = new Keyboard(window, this.animation, this.player.mesh)

            for (let i in this.enemyArray) {
                let animation = new Animation(this.enemyArray[i].mesh)
                animation.playAnim('stand')
                this.animationArray.push(animation)
            }
        }

        this.render()
    }

    detectCollisionCubes(object1, object2) {

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

        for (let i in this.animationArray) {
            if (this.animationArray) this.animationArray[i].update(delta)
        }

        if (this.player.mesh) {
            const camVect = new Vector3(-400, 50, 0)
            // const camVect = new Vector3(-0, 5000, 0)
            const camPos = camVect.applyMatrix4(this.player.mesh.matrixWorld)

            this.camera.threeCamera.position.x = camPos.x
            this.camera.threeCamera.position.y = camPos.y - (this.size / 2)
            this.camera.threeCamera.position.z = camPos.z

            this.camera.threeCamera.lookAt(this.player.mesh.position)

            document.getElementById('collision').innerText = 'false'
            this.collides = false

            for (let i in this.wallArray) {
                if (this.wallArray[i] !== null && this.detectCollisionCubes(this.collider, this.wallArray[i])) {
                    document.getElementById('collision').innerText = 'true'
                    this.collides = true
                    break
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
                if (Config.moveForward && !this.collides) {
                    this.player.mesh.translateX(Config.run ? 2 : 1)
                    this.axesHelper.translateX(Config.run ? 2 : 1)
                    this.collider.translateX(Config.run ? 2 : 1)
                }
                if (Config.moveBackward) {
                    this.player.mesh.translateX(Config.run ? -2 : -1)
                    this.axesHelper.translateX(Config.run ? -2 : -1)
                    this.collider.translateX(Config.run ? -2 : -1)
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
                ).toString() + '%'
            }
        }
        if (this.player.mesh && this.intersects && this.raycaster) {
            for (let i = 0; i < this.wallArray.length; i++) {
                //this.wallArray[i].rotation.y = Math.atan2((this.player.mesh.position.x - this.wallArray[i].position.x),
                // (this.player.mesh.position.z - this.wallArray[i].position.z));
                //this.wallArray[i].material.color.setHex(0x118822)
            }

            let target = new Vector3(0, 0, 0)

            this.raycaster = new Raycaster()
            let ray = new Ray(this.player.mesh.position, this.player.mesh.getWorldDirection(target))
            this.raycaster.ray = ray
            this.intersects = this.raycaster.intersectObjects(this.wallArray)

            this.intersects.forEach(element => {

                //element.object.material.color.setHex(0xff1111);
            })
        }

        this.stats.end()

        requestAnimationFrame(this.render.bind(this))
    }
}