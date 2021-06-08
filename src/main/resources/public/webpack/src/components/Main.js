/* eslint-disable require-jsdoc */
let mapa = [{ 'id': '0-0', 'x': 0, 'z': 0, 'type': 'wall' }, { 'id': '0-1', 'x': 1, 'z': 0, 'type': 'wall' }, { 'id': '0-2', 'x': 2, 'z': 0, 'type': 'wall' }, { 'id': '0-3', 'x': 3, 'z': 0, 'type': 'wall' }, { 'id': '0-4', 'x': 4, 'z': 0, 'type': 'wall' }, { 'id': '0-5', 'x': 5, 'z': 0, 'type': 'wall' }, { 'id': '0-6', 'x': 6, 'z': 0, 'type': 'wall' }, { 'id': '0-7', 'x': 7, 'z': 0, 'type': 'wall' }, { 'id': '0-8', 'x': 8, 'z': 0, 'type': 'wall' }, { 'id': '0-9', 'x': 9, 'z': 0, 'type': 'wall' }, { 'id': '1-0', 'x': 0, 'z': 1, 'type': 'wall' }, { 'id': '1-1', 'x': 1, 'z': 1, 'type': 'light' }, { 'id': '1-2', 'x': 2, 'z': 1, 'type': 'light' }, { 'id': '1-3', 'x': 3, 'z': 1, 'type': 'light' }, { 'id': '1-6', 'x': 6, 'z': 1, 'type': 'light' }, { 'id': '1-7', 'x': 7, 'z': 1, 'type': 'light' }, { 'id': '1-8', 'x': 8, 'z': 1, 'type': 'light' }, { 'id': '1-9', 'x': 9, 'z': 1, 'type': 'wall' }, { 'id': '2-0', 'x': 0, 'z': 2, 'type': 'wall' }, { 'id': '2-2', 'x': 2, 'z': 2, 'type': 'enemy' }, { 'id': '2-7', 'x': 7, 'z': 2, 'type': 'enemy' }, { 'id': '2-9', 'x': 9, 'z': 2, 'type': 'wall' }, { 'id': '3-0', 'x': 0, 'z': 3, 'type': 'wall' }, { 'id': '3-9', 'x': 9, 'z': 3, 'type': 'wall' }, { 'id': '4-0', 'x': 0, 'z': 4, 'type': 'wall' }, { 'id': '4-4', 'x': 4, 'z': 4, 'type': 'treasure' }, { 'id': '4-5', 'x': 5, 'z': 4, 'type': 'treasure' }, { 'id': '4-9', 'x': 9, 'z': 4, 'type': 'wall' }, { 'id': '5-0', 'x': 0, 'z': 5, 'type': 'wall' }, { 'id': '5-4', 'x': 4, 'z': 5, 'type': 'treasure' }, { 'id': '5-5', 'x': 5, 'z': 5, 'type': 'treasure' }, { 'id': '5-9', 'x': 9, 'z': 5, 'type': 'wall' }, { 'id': '6-0', 'x': 0, 'z': 6, 'type': 'wall' }, { 'id': '6-9', 'x': 9, 'z': 6, 'type': 'wall' }, { 'id': '7-0', 'x': 0, 'z': 7, 'type': 'wall' }, { 'id': '7-2', 'x': 2, 'z': 7, 'type': 'enemy' }, { 'id': '7-7', 'x': 7, 'z': 7, 'type': 'enemy' }, { 'id': '7-9', 'x': 9, 'z': 7, 'type': 'wall' }, { 'id': '8-0', 'x': 0, 'z': 8, 'type': 'wall' }, { 'id': '8-9', 'x': 9, 'z': 8, 'type': 'wall' }, { 'id': '9-0', 'x': 0, 'z': 9, 'type': 'wall' }, { 'id': '9-1', 'x': 1, 'z': 9, 'type': 'wall' }, { 'id': '9-2', 'x': 2, 'z': 9, 'type': 'wall' }, { 'id': '9-3', 'x': 3, 'z': 9, 'type': 'wall' }, { 'id': '9-4', 'x': 4, 'z': 9, 'type': 'wall' }, { 'id': '9-5', 'x': 5, 'z': 9, 'type': 'wall' }, { 'id': '9-6', 'x': 6, 'z': 9, 'type': 'wall' }, { 'id': '9-7', 'x': 7, 'z': 9, 'type': 'wall' }, { 'id': '9-8', 'x': 8, 'z': 9, 'type': 'wall' }, { 'id': '9-9', 'x': 9, 'z': 9, 'type': 'wall' }]

import Renderer from './Renderer'
import Camera from './Camera'
import Model from './Model'
import Keyboard from './Keyboard'
import Animation from './Animation'
import Config from './Config'

import darthVaderMD2 from './assets/DarthVader.md2'

import Stats from 'three/examples/jsm/libs/stats.module.js'

import {
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    Raycaster,
    Ray,
    BoxGeometry,
    MeshBasicMaterial,
    DoubleSide,
    Mesh,
    AxesHelper,
    Scene
} from 'three'


export default class Main {
    constructor(container) {
        this.collides = false
        this.isLoaded = null
        this.animation = null
        this.animTime = 0
        
        this.container = container
        this.scene = new Scene()
        this.renderer = new Renderer(this.scene, container)
        this.camera = new Camera(this.renderer.threeRenderer)

        this.axesHelper = new AxesHelper(100)
        this.scene.add(this.axesHelper)

        this.cubeArray = []
        let i

        for (let z = 0; z < 10; z++) {
            for (let x = 0; x < 10; x++) {
                let geometry = new BoxGeometry(50, 50, 50)
                let material = new MeshBasicMaterial({
                    color: 0x888888,
                    side: DoubleSide,
                    wireframe: false,
                    transparent: true,
                    opacity: 1
                })
                i = this.cubeArray.length
                this.cubeArray[i] = new Mesh(geometry, material)
                this.cubeArray[i].position.x = x * 50
                this.cubeArray[i].position.y = -50
                this.cubeArray[i].position.z = z * 50
                this.scene.add(this.cubeArray[i])
            }
        }

        let boxColor

        mapa.forEach(element => {
            switch (element.type) {
            case 'wall':
                boxColor = 0x118822
                break
            case 'enemy':
                boxColor = 0x991111
                break
            case 'treasure':
                boxColor = 0x111199
                break
            case 'light':
                boxColor = 0x999911
                break
            default:
                break
            }
            let geometry = new BoxGeometry(50, 50, 50)
            let material = new MeshBasicMaterial({
                color: boxColor,
                side: DoubleSide,
                wireframe: false,
                transparent: true,
                opacity: 0.5
            })
            i = this.cubeArray.length
            this.cubeArray[i] = new Mesh(geometry, material)
            this.cubeArray[i].position.x = element.x * 50
            this.cubeArray[i].position.y = 0
            this.cubeArray[i].position.z = element.z * 50
            this.scene.add(this.cubeArray[i])
        })




        this.axes = new AxesHelper(1000)
        this.scene.add(this.axes)
        // grid - testowa siatka na podłoże modelu

        //const gridHelper = new GridHelper(1000, 10);
        //this.scene.add(gridHelper);

        //stats - statystyki wydajności

        this.stats = new Stats()
        this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb

        document.body.appendChild(this.stats.dom)

        // zegar - vide lekcja 4

        this.clock = new Clock()

        // manager loadingu, pozwala monitorować progress oraz fakt zakończenia ładowania

        this.manager = new LoadingManager()

        // model

        this.model = new Model(this.scene, this.manager)
        this.model.load(darthVaderMD2)

        // moniytor progressu ładowania

        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`)
        }

        //

        this.manager.onLoad = () => {
            this.isLoaded = true
            this.animation = new Animation(this.model.mesh)
            this.animation.playAnim('Stand')
            this.keyboard = new Keyboard(window, this.animation, this.model.mesh)
        }

        this.render()
    }

    render() {
        const camVect = new Vector3(0, 200, -200)

        // początek pomiaru wydajności
        this.stats.begin()

        // delta do animacji
        let delta = this.clock.getDelta()

        // wykonanie funkcji update w module Animations - zobacz do pliku Animations
        if (this.animation) this.animation.update(delta)

        this.renderer.render(this.scene, this.camera.threeCamera)

        // obsługa ruch modelu dopiero kiedy jest załadowany, można tą część umieścić w module Keyboard
        // tworząc w nim np funkcję update() i wywoływać ją poniżej

        if (this.model.mesh) {
            const camPos = camVect.applyMatrix4(this.model.mesh.matrixWorld)
            this.camera.threeCamera.position.x = camPos.x
            this.camera.threeCamera.position.y = camPos.y
            this.camera.threeCamera.position.z = camPos.z
            this.camera.threeCamera.lookAt(this.model.mesh.position)
            //
            if (!Config.attack) {
                if (Config.rotateLeft) {
                    this.model.mesh.rotation.y += 0.03
                    this.axesHelper.rotation.y += 0.03
                    // this.collider.rotation.y += 0.03
                }
                if (Config.rotateRight) {
                    this.model.mesh.rotation.y -= 0.03
                    this.axesHelper.rotation.y -= 0.03
                    // this.collider.rotation.y -= 0.03
                }
                if (Config.moveForward && !this.collides) {
                    this.model.mesh.translateX(Config.run ? 2 : 1)
                    this.axesHelper.translateX(Config.run ? 2 : 1)
                    // this.collider.translateX(Config.run ? 2 : 1)
                }
                if (Config.moveBackward) {
                    this.model.mesh.translateX(Config.run ? -2 : -1)
                    this.axesHelper.translateX(Config.run ? -2 : -1)
                    // this.collider.translateX(Config.run ? -2 : -1)
                }
            } else {
                // console.log(this.model.mesh.getWorldDirection(new Vector3()))
                this.animTime += delta
                if (this.animTime >= 0.8) {
                    if ( (Config.moveForward || Config.moveBackward) && !Config.run)
                        this.animation.playAnim('CrWalk')
                    else if ( (Config.moveForward || Config.moveBackward) && Config.run)
                        this.animation.playAnim('Run')
                    else this.animation.playAnim('Stand')

                    this.animTime = 0
                    Config.attack = false
                }
                document.getElementById('accuracy').innerText = parseInt( 
                    parseFloat(document.getElementById('hits').innerText) / parseFloat(document.getElementById('shots').innerText) * 100
                ).toString() + '%'
            }
        }
        if (this.model.mesh && this.intersects && this.raycaster) {
            for (let i = 0; i < this.cubeArray.length; i++) {
                //this.cubeArray[i].rotation.y = Math.atan2((this.model.mesh.position.x - this.cubeArray[i].position.x), (this.model.mesh.position.z - this.cubeArray[i].position.z));
                //this.cubeArray[i].material.color.setHex(0x118822)
            }

            let target = new Vector3(0, 0, 0)

            this.raycaster = new Raycaster()
            let ray = new Ray(this.model.mesh.position, this.model.mesh.getWorldDirection(target))
            this.raycaster.ray = ray
            this.intersects = this.raycaster.intersectObjects(this.cubeArray)

            this.intersects.forEach(element => {

                //element.object.material.color.setHex(0xff1111);
            })
        }





        // koniec statystyk
        this.stats.end()

        requestAnimationFrame(this.render.bind(this))
    }
}