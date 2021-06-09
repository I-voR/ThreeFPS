/* eslint-disable require-jsdoc */
import { MD2Loader } from './MD2Loader'
import {
    Mesh,
    TextureLoader,
    MeshPhongMaterial
} from 'three'
import playerPNG from './assets/player.png'
export default class Player {
    constructor(scene, manager) {
        this.scene = scene
        this.mesh = null
        this.manager = manager
        this.geometry = null
    }
    load(path) {
        new MD2Loader(this.manager).load(
            path,
            geometry => {
                this.geometry = geometry
                let texture = new TextureLoader().load(playerPNG)
                let material = new MeshPhongMaterial({ map: texture, morphTargets: true });
                this.mesh = new Mesh(geometry, material)
                this.scene.add(this.mesh)
            },
        )
    }

    unload() {
        this.scene.remove(this.mesh)
    }
}
