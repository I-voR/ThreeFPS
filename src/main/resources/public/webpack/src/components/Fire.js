/* eslint-disable require-jsdoc */
import { 
    Object3D, 
    SpriteMaterial, 
    TextureLoader, 
    AdditiveBlending, 
    PointLight 
} from 'three'

import fireTex from './assets/fire.png'
import Particle from './Particle.js'
import Config from './Config.js'

export default class Fire extends Object3D {
    constructor(x, y, z) {
        super()
        this.particles = []
        this.x = x
        this.y = y
        this.z = z
        this.count = 5

        this.particleMaterial = new SpriteMaterial({
            color: 0xff6613,
            map: new TextureLoader().load(fireTex),
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: AdditiveBlending
        })

        this.point = new PointLight(0xff6613, 200 * Config.light, 100 * Config.light)
        this.position.set(this.x, this.y, this.z)
        this.point.position.set(this.x, this.y, this.z)
        console.log(this.point.position)
        this.init()
    }

    init() {
        for (let i = 0; i < this.count; i++) {
            let particle = new Particle(this.particleMaterial)
            this.add(particle)
            this.particles.push(particle)
        }
    }

    update() {
        this.point.intensity = 100 * Config.light
        for (let i = 0; i < this.count; i++) {
            this.particles[i].update()
        }
    }
}
