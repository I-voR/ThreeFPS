/* eslint-disable require-jsdoc */
import { MD2Loader } from './MD2Loader'
import {
    Mesh,
    TextureLoader,
    MeshPhongMaterial
} from 'three'
import enemyPNG from './assets/enemy.png'
export default class Enemy {
    constructor(scene, manager, size, xAxis, zAxis) {
        this.x = xAxis
        this.z = zAxis
        this.scene = scene
        this.manager = manager
        this.size = size
        this.mesh = null
        this.geometry = null
    }
    load(path) {
        new MD2Loader(this.manager).load(
            path,
            geometry => {
                this.geometry = geometry
                let texture = new TextureLoader().load(enemyPNG)
                let material = new MeshPhongMaterial({ map: texture, morphTargets: true });
                this.mesh = new Mesh(geometry, material)
                this.scene.add(this.mesh)
                this.mesh.position.set(this.x * this.size, 0, this.z * this.size)
            },
        )
    }
    unload() {
        this.scene.remove(this.mesh)
    }
}


