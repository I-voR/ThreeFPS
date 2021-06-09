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

        this.point = new PointLight(0xff6613, 20, 10)
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
        for (let i = 0; i < this.count; i++) {
            this.particles[i].update()
        }
    }
}
