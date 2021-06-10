/* eslint-disable require-jsdoc */
import {
    PointLight 
} from 'three'

import Config from './Config'

export default class LightSource {
    constructor(scene, size, x, z) {
        this.scene = scene
        this.fires = []
        this.size = size
        this.x = x
        this.z = z
        // this.point = new PointLight(0xff6613, 10, 10 * Config.light)
        this.point = new PointLight(0xffffff, 10, 10 * Config.light)
        this.point.position.set(this.x * this.size, 5, this.z * this.size)
        this.scene.add(this.point)
    }

    update() {
        this.point.distance = 10 * Config.light
        for (let i in this.fires) {
            this.fires[i].update()
        }
    }
}
