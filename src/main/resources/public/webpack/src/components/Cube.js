/* eslint-disable require-jsdoc */
import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh, DoubleSide
} from 'three'

export default class Cube extends Mesh {
    constructor(size, x, z, boxColor) {
        super(
            new BoxGeometry(size, size, size),
            new MeshBasicMaterial({
                color: boxColor,
                side: DoubleSide,
                wireframe: false,
                transparent: true,
                opacity: 0.5
            })
        )
        this.position.set(x * size, 0, z * size)
    }
}
