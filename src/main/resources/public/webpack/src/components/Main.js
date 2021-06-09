/* eslint-disable require-jsdoc */
//let mapa = [{ "id": "0-0", "x": 0, "z": 0, "type": "wall" }, { "id": "0-1", "x": 1, "z": 0, "type": "wall" }, { "id": "0-2", "x": 2, "z": 0, "type": "wall" }, { "id": "0-3", "x": 3, "z": 0, "type": "wall" }, { "id": "0-4", "x": 4, "z": 0, "type": "wall" }, { "id": "0-5", "x": 5, "z": 0, "type": "wall" }, { "id": "0-6", "x": 6, "z": 0, "type": "wall" }, { "id": "0-7", "x": 7, "z": 0, "type": "wall" }, { "id": "0-8", "x": 8, "z": 0, "type": "wall" }, { "id": "0-9", "x": 9, "z": 0, "type": "wall" }, { "id": "1-5", "x": 5, "z": 1, "type": "light" }, { "id": "4-0", "x": 0, "z": 4, "type": "light" }, { "id": "4-8", "x": 8, "z": 4, "type": "light" }, { "id": "6-9", "x": 9, "z": 6, "type": "light" }, { "id": "7-1", "x": 1, "z": 7, "type": "light" }, { "id": "7-3", "x": 3, "z": 7, "type": "light" }, { "id": "8-2", "x": 2, "z": 8, "type": "enemy" }, { "id": "8-6", "x": 6, "z": 8, "type": "enemy" }, { "id": "9-0", "x": 0, "z": 9, "type": "wall" }, { "id": "9-1", "x": 1, "z": 9, "type": "wall" }, { "id": "9-2", "x": 2, "z": 9, "type": "wall" }, { "id": "9-3", "x": 3, "z": 9, "type": "wall" }, { "id": "9-4", "x": 4, "z": 9, "type": "wall" }, { "id": "9-5", "x": 5, "z": 9, "type": "wall" }, { "id": "9-6", "x": 6, "z": 9, "type": "wall" }, { "id": "9-7", "x": 7, "z": 9, "type": "wall" }, { "id": "9-8", "x": 8, "z": 9, "type": "wall" }, { "id": "9-9", "x": 9, "z": 9, "type": "wall" }]
import Renderer from './Renderer'
import Camera from './Camera'
import Player from './Player'
import Enemy from './Enemy'
import Keyboard from './Keyboard'
import Animation from './Animation'
import Config from './Config'
import Collider from './Collider'
import playerMD2 from './assets/player.md2'
import enemyMD2 from './assets/enemy.md2'
import wallPNG from './assets/wall.jpg'
import floorJPG from './assets/floor.jpg'
import treasureJPG from './assets/treasure.jpg'
import Stats from 'three/examples/jsm/libs/stats.module.js'

import {
    LoadingManager,
    Clock,
    Vector3,
    Raycaster,
    Ray,
    AxesHelper,
    Scene,
    TextureLoader,
    BoxGeometry,
    MeshPhongMaterial,
    Mesh,
    PointLight,
    PlaneGeometry,
    DoubleSide
} from 'three'
export default class Main {
    constructor(container, mapa) {
        //stała wielkości pola
        this.squareSize = 70
        //flagi
        this.collideFlag = false
        this.placeFlag = true
        //animacje
        this.isLoaded = null
        this.animation = null
        this.animationArray = []
        this.animationTime = 0
        //scena etc
        this.container = container
        this.scene = new Scene()
        this.renderer = new Renderer(this.scene, container)
        this.camera = new Camera(this.renderer.threeRenderer)
        this.collider = new Collider()
        this.scene.add(this.collider)
        this.axesHelper = new AxesHelper(100)
        this.scene.add(this.axesHelper)
        //tablice generowanych typów obiektów na mapie
        this.wallArray = []
        this.enemyArray = []
        this.lightArray = []
        this.treasureArray = []
        //generowanie podłogi/sufitu
        var planeeGeometry = new PlaneGeometry(this.squareSize * 10, this.squareSize * 10)
        var planeMaterial = new MeshPhongMaterial({ map: new TextureLoader().load(floorJPG), side: DoubleSide })
        var planeFloor = new Mesh(planeeGeometry, planeMaterial)
        var planeRoof = new Mesh(planeeGeometry, planeMaterial)
        planeFloor.rotation.x = Math.PI / 2
        planeRoof.rotation.x = Math.PI / 2
        planeFloor.position.set(this.squareSize * 4.5, -this.squareSize / 2, this.squareSize * 4.5)
        planeRoof.position.set(this.squareSize * 4.5, this.squareSize / 2, this.squareSize * 4.5)
        this.scene.add(planeFloor)
        this.scene.add(planeRoof)
        //tekstura ściany  
        const wallTexture = new TextureLoader().load(wallPNG)
        const treasureTexture = new TextureLoader().load(treasureJPG)
        //generacja obiektów na mapie
        mapa.forEach(element => {
            let item
            let wallGeometry
            let treasureGeometry
            switch (element.type) {
                case 'enemy':
                    //przeciwnicy
                    item = new Enemy(this.scene, this.manager, this.squareSize, element.x, element.z)
                    item.load(enemyMD2)
                    this.enemyArray.push(item)
                    break
                case 'wall':
                    //ściany
                    const wallMaterial = new MeshPhongMaterial({ map: wallTexture });
                    wallGeometry = new BoxGeometry(this.squareSize, this.squareSize, this.squareSize)
                    item = new Mesh(wallGeometry, wallMaterial);
                    item.position.set(element.x * this.squareSize, 0, element.z * this.squareSize)
                    this.wallArray.push(item)
                    this.scene.add(item)
                    break
                case 'treasure':
                    //skarb
                    const treasureMaterial = new MeshPhongMaterial({ map: treasureTexture });
                    treasureGeometry = new BoxGeometry(this.squareSize / 2, this.squareSize / 2, this.squareSize / 2)
                    item = new Mesh(treasureGeometry, treasureMaterial);
                    item.position.set(element.x * this.squareSize, -this.squareSize / 4, element.z * this.squareSize)
                    this.wallArray.push(item)
                    this.scene.add(item)
                    break
                case 'light':
                    //światło punktowe
                    item = new PointLight(0xffffff, 0.6);
                    item.position.set(element.x * this.squareSize, 0, element.z * this.squareSize)
                    this.lightArray.push(item)
                    this.scene.add(item)
                    break
                default:
                    break
            }
        })
        this.stats = new Stats()
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom)
        this.clock = new Clock()
        this.manager = new LoadingManager()
        this.player = new Player(this.scene, this.manager)
        this.player.load(playerMD2)
        this.manager.onLoad = () => {
            let playerX = 0
            let playerZ = 0
            let notFreeSpace = mapa.map(a => a = { x: a.x, z: a.z })
            while (this.placeFlag) {
                notFreeSpace.forEach(element => {
                    if (playerX != element.x || playerZ != element.z) { this.placeFlag = false } else { if (playerX < 9) { playerX++ } else { playerZ++; playerX = 0 } }
                });
            }
            this.player.mesh.position.set(playerX * this.squareSize, -10, playerZ * this.squareSize)
            this.collider.position.set(playerX * this.squareSize, -10, playerZ * this.squareSize)
            this.axesHelper.position.set(playerX * this.squareSize, -10, playerZ * this.squareSize)
            this.isLoaded = true
            this.animation = new Animation(this.player.mesh)
            this.animation.playAnim('stand')
            this.keyboard = new Keyboard(window, this.animation, this.player.mesh)
            for (let i in this.enemyArray) {
                this.enemyArray[i].mesh.position.y = -10
                let animation = new Animation(this.enemyArray[i].mesh)
                animation.playAnim('taunt')
                this.animationArray.push(animation)
            }
        }
        this.render()
    }
    //kolizje
    detectCollisionCubes(firstObj, secondObj) {
        firstObj.geometry.computeBoundingBox()
        firstObj.updateMatrixWorld()
        secondObj.geometry.computeBoundingBox()
        secondObj.updateMatrixWorld()
        let firstBox = firstObj.geometry.boundingBox.clone()
        let secondBox = secondObj.geometry.boundingBox.clone()
        firstBox.applyMatrix4(firstObj.matrixWorld)
        secondBox.applyMatrix4(secondObj.matrixWorld)
        return firstBox.intersectsBox(secondBox)
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
            for (let i = 0; i < this.enemyArray.length; i++) {
                this.enemyArray[i].mesh.rotation.y = Math.atan2((this.player.mesh.position.x - this.enemyArray[i].mesh.position.x), (this.player.mesh.position.z - this.enemyArray[i].mesh.position.z));
            }
            const camVect = new Vector3(-200, 40, 0)
            const camPos = camVect.applyMatrix4(this.player.mesh.matrixWorld)
            this.camera.threeCamera.position.x = camPos.x
            this.camera.threeCamera.position.y = camPos.y
            this.camera.threeCamera.position.z = camPos.z
            this.camera.threeCamera.lookAt(this.player.mesh.position)
            this.collideFlag = false
            for (let i in this.wallArray) {
                if (this.wallArray[i] !== null && this.detectCollisionCubes(this.collider, this.wallArray[i])) {
                    this.collideFlag = true
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
                if (Config.moveForward && !this.collideFlag) {
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
                this.animationTime += delta
                if (this.animationTime >= 0.8) {
                    if ((Config.moveForward || Config.moveBackward) && !Config.run)
                        this.animation.playAnim('crwalk')
                    else if ((Config.moveForward || Config.moveBackward) && Config.run)
                        this.animation.playAnim('run')
                    else this.animation.playAnim('stand')
                    this.animationTime = 0
                    Config.attack = false
                }
            }
        }
        if (this.player.mesh && this.intersects && this.raycaster) {
            let target = new Vector3(0, 0, 0)
            this.raycaster = new Raycaster()
            let ray = new Ray(this.player.mesh.position, this.player.mesh.getWorldDirection(target))
            this.raycaster.ray = ray
            this.intersects = this.raycaster.intersectObjects(this.wallArray)
        }
        this.stats.end()
        requestAnimationFrame(this.render.bind(this))
    }
}