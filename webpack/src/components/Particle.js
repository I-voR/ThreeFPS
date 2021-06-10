/* eslint-disable require-jsdoc */
import { Sprite, Vector3 } from 'three'

export default class Particle extends Sprite {
    constructor(material) {
        super()

        this.material = material.clone()
        this.scale.set(
            Math.random() * 2,
            Math.random() * 2,
            Math.random() * 2
        )
    }

    update() {
        if (this.position.y > 20) {
            this.position.x = Math.random() * 1
            this.position.z = Math.random() * 1
            this.position.y = 0
            this.material.opacity = 1
        }

        this.material.opacity -= 0.1
        this.position.y += 0.1
    }
}