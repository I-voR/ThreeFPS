/* eslint-disable require-jsdoc */
import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three'
export default class Cube extends Mesh {
    constructor() {
        super(
            new BoxGeometry(10, 55, 20),
            new MeshBasicMaterial( { transparent: true, opacity: 0 } )
        )
        this.position.y += 5
    }
}
