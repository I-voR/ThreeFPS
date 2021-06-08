/* eslint-disable require-jsdoc */
import {
    PlaneGeometry,
    MeshBasicMaterial,
    DoubleSide,
    Mesh
} from 'three'

export default class Floor extends Mesh {
    constructor(size) {
        super(
            new PlaneGeometry(size * 10, size * 10),
            new MeshBasicMaterial({
                color: 0x888888,
                side: DoubleSide,
                wireframe: false,
                transparent: true,
                opacity: 1
            })
        )
        this.rotation.x = Math.PI / 2
        this.position.set(size * 4.5, -size / 2, size * 4.5)
    }
}
