/* eslint-disable require-jsdoc */
import { MD2Loader } from './MD2Loader.js'
import {
    Mesh,
    TextureLoader,
    MeshPhongMaterial
} from 'three'

export default class Entity {
    constructor(scene, manager, texture, size, x, z) {
        this.texture = texture
        this.scene = scene
        this.manager = manager
        this.size = size
        this.x = x
        this.z = z
        this.mesh = null
        this.geometry = null
    }

    load(model) {
        new MD2Loader(this.manager).load(
            model,
            geometry => {
                console.log(geometry.animations)
                this.geometry = geometry

                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(this.texture),
                    morphTargets: true
                }))

                this.scene.add(this.mesh)
                this.mesh.position.set(this.x * this.size, 25, this.z * this.size)
            },
        )
    }

    unload() {
        this.scene.remove(this.mesh)
    }
}
