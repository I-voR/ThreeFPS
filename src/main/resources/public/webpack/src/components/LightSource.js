/* eslint-disable require-jsdoc */
import Fire from './Fire.js'

export default class LightSource {
    constructor(scene, size, x, z) {
        this.scene = scene
        this.fires = []
        this.size = size
        this.x = x
        this.z = z
        for (let i = 0; i < 12; i++) {
            let t = i * (Math.PI / 6)
            let fire = new Fire(12 * Math.cos(t) + this.size * x, 1, 12 * Math.sin(t) + this.size * z)

            this.scene.add(fire)
            this.fires.push(fire)
        }
    }

    update() {
        for (let i in this.fires) {
            this.fires[i].update()
        }
    }
}
