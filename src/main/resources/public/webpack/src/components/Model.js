/* eslint-disable require-jsdoc */
import { MD2Loader } from './MD2Loader'
import { Mesh, TextureLoader, MeshBasicMaterial } from 'three'

import darthVaderTex from './assets/DarthVader.jpg'

export default class Model {
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
                console.log(geometry.animations)
                this.geometry = geometry

                this.mesh = new Mesh(geometry, new MeshBasicMaterial({
                    map: new TextureLoader().load(darthVaderTex),
                    morphTargets: true
                }))
                
                this.scene.add(this.mesh)
            },
        )
    }

    unload() {
        this.scene.remove(this.mesh)
    }
}
