/* eslint-disable require-jsdoc */
import { PerspectiveCamera, Vector3 } from 'three'

export default class Camera {
    constructor(renderer) {
        this.threeCamera = new PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 10000)
        this.updateSize(renderer)

        window.addEventListener('resize', () => this.updateSize(renderer), false)
    }

    updateSize(renderer) {
        this.threeCamera.aspect = renderer.domElement.width / renderer.domElement.height
        this.threeCamera.updateProjectionMatrix()
    }
}