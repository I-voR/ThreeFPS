/* eslint-disable require-jsdoc */
import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three'

export default class Cube extends Mesh {
    constructor() {
        super(
            new BoxGeometry(10, 10, 10),
            new MeshBasicMaterial( {
                transparent: true,
                opacity: 0
            } )
        )
        this.position.x += 5
    }
}
