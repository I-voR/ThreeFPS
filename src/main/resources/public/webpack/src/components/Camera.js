/* eslint-disable require-jsdoc */
import { PerspectiveCamera, Vector3 } from 'three'

export default class Camera {
    constructor(renderer) {
        this.threeCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
        // this.threeCamera.position.set(0, 100, 0)
        this.threeCamera.lookAt(new Vector3(0, 1000, 0))
        this.threeCamera.position.set(0, 0, 0)
        this.updateSize(renderer)

        window.addEventListener('resize', () => this.updateSize(renderer), false);
    }

    updateSize(renderer) {
        this.threeCamera.aspect = renderer.domElement.width / renderer.domElement.height;
        this.threeCamera.updateProjectionMatrix();
    }
}