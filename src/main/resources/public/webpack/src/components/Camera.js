/* eslint-disable require-jsdoc */
import { PerspectiveCamera } from 'three'
export default class Camera {
    constructor(renderer) {
        const FOV = 20
        const RATIO = window.innerWidth / window.innerHeight
        this.threeCamera = new PerspectiveCamera(FOV, RATIO, 1, 10000)
        this.updateSize(renderer)
        window.addEventListener('resize', () => this.updateSize(renderer), false)
    }
    updateSize(renderer) {
        this.threeCamera.aspect = renderer.domElement.width / renderer.domElement.height
        this.threeCamera.updateProjectionMatrix()
    }
}