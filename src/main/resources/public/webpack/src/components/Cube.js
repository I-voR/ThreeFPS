/* eslint-disable require-jsdoc */
import {
    BoxGeometry,
    MeshPhongMaterial,
    Mesh,
    DoubleSide,
    TextureLoader
} from 'three'

export default class Cube extends Mesh {
    constructor(size, x, z, color, texture) {
        let parameters = color === null ?
            {
                map: new TextureLoader().load(texture),
                side: DoubleSide,
                wireframe: false,
                transparent: true,
                opacity: 0.5
            } : {
                color: color,
                side: DoubleSide,
                wireframe: false,
                transparent: true,
                opacity: 0.5
            }
        super(
            new BoxGeometry(size, size, size),
            new MeshPhongMaterial(parameters)
        )
        this.position.set(x * size, size / 2, z * size)
    }
}
