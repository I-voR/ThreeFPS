/* eslint-disable require-jsdoc */
import {
    PlaneGeometry,
    MeshBasicMaterial,
    DoubleSide,
    Mesh
} from 'three'

export default class Floor extends Mesh {
    constructor(size, x, z) {
        super(
            new PlaneGeometry(size, size),
            new MeshBasicMaterial({
                color: 0x888888,
                side: DoubleSide,
                wireframe: false,
                transparent: true,
                opacity: 1
            })
        )
        this.rotation.x = Math.PI / 2
        this.position.set(x * size, -size, z * size)
    }
}
