/* eslint-disable require-jsdoc */
import {
    PlaneGeometry,
    MeshPhongMaterial,
    // MeshBasicMaterial,
    DoubleSide,
    TextureLoader,
    Mesh
} from 'three'

import floorTex from './assets/floor.png'

export default class Floor extends Mesh {
    constructor(size) {
        super(
            new PlaneGeometry(size * 10, size * 10),
            new MeshPhongMaterial({
            // new MeshBasicMaterial({
                map: new TextureLoader().load(floorTex),
                side: DoubleSide,
                // transparent: true,
                // opacity: 0
            })
        )
        this.rotation.x = Math.PI / 2
        this.position.set(size * 4.5, 0, size * 4.5)
    }
}
