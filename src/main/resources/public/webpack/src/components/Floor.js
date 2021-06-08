/* eslint-disable require-jsdoc */
import {
    PlaneGeometry,
    MeshPhongMaterial,
    DoubleSide,
    TextureLoader,
    Mesh
} from 'three'

export default class Floor extends Mesh {
    constructor(size) {
        super(
            new PlaneGeometry(size * 10, size * 10),
            new MeshPhongMaterial({ map: new TextureLoader().load("./src/components/assets/floor.jpg"), side: DoubleSide })
        )
        this.rotation.x = Math.PI / 2
        this.position.set(size * 4.5, -size / 2, size * 4.5)
    }
}
