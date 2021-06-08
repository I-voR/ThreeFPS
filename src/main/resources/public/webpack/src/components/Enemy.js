/* eslint-disable require-jsdoc */
import { MD2Loader } from './MD2Loader'
import {
    Mesh,
    TextureLoader,
    MeshBasicMaterial
} from 'three'

import darthMaulTex from './assets/DarthMaul.jpg'

export default class Enemy {
    constructor(scene, manager, size, x, z) {
        this.scene = scene
        this.manager = manager
        this.size = size
        this.x = x
        this.z = z
        this.mesh = null
        this.geometry = null
    }

    load(path) {
        new MD2Loader(this.manager).load(
            path,
            geometry => {
                console.log('Enemy: ', geometry.animations)
                this.geometry = geometry

                this.mesh = new Mesh(geometry, new MeshBasicMaterial({
                    map: new TextureLoader().load(darthMaulTex),
                    morphTargets: true
                }))

                this.scene.add(this.mesh)
                this.mesh.position.set(this.x * this.size, 0, this.z * this.size)
            },
        )
    }

    unload() {
        this.scene.remove(this.mesh)
    }
}
