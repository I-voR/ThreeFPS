/* eslint-disable require-jsdoc */
import {
    BoxGeometry,
    MeshPhongMaterial,
    Mesh,
    DoubleSide,
    TextureLoader
} from 'three'

export default class Cube extends Mesh {
    constructor(size, x, z, texture, isTreasure) {
        super(
            new BoxGeometry(size, size, size),
            new MeshPhongMaterial({
                map: new TextureLoader().load(texture),
                side: DoubleSide,
                wireframe: false,
            })
        )
        this.position.set(x * size * (isTreasure ? 2 : 1), size / 2, z * size * (isTreasure ? 2 : 1))
    }
}
