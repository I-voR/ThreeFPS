/* eslint-disable require-jsdoc */
import Config from './Config'

const KEYS = {
    'W': 87,
    'A': 65,
    'S': 83,
    'D': 68,
    'SPACE': 32,
    'SHIFT': 16
}

export default class Keyboard {
    constructor(domElement, animation, modelMesh) {
        this.domElement = domElement
        this.animation = animation
        this.modelMesh = modelMesh

        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false)
        this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false)
    }

    onKeyUp(event) {
        switch (event.keyCode) {
        case KEYS.W:
            if ( (Config.moveForward || Config.moveBackward) ) this.animation.playAnim('Stand')
            Config.moveForward = false
            break
            
        case KEYS.A:
            Config.rotateLeft = false
            break

        case KEYS.S:
            if ( (Config.moveForward || Config.moveBackward) ) this.animation.playAnim('Stand')
            Config.moveBackward = false
            break

        case KEYS.D:
            Config.rotateRight = false
            break

        case KEYS.SHIFT:
            if ( !(Config.moveForward || Config.moveBackward) ) this.animation.playAnim('Stand')
            else this.animation.playAnim('CrWalk')

            Config.run = false
            break
        }
    }

    onKeyDown(event) {
        if (Config.attack) return

        switch (event.keyCode) {
        case KEYS.A:
            Config.rotateLeft = true
            break

        case KEYS.D:
            Config.rotateRight = true
            break

        case KEYS.W:
            if ( !(Config.moveForward || Config.run) ) this.animation.playAnim('CrWalk')
            else if (Config.run) this.animation.playAnim('Run')
            Config.moveForward = true
            break

        case KEYS.S:
            if ( !(Config.moveBackward || Config.run) ) this.animation.playAnim('CrWalk')
            else if (Config.run) this.animation.playAnim('Run')
            Config.moveBackward = true
            break

        case KEYS.SPACE:
            if (!Config.attack) this.animation.playAnim('Attack')
            Config.attack = true

            document.getElementById('shots').innerText = parseInt(document.getElementById('shots').innerText) + 1

            break

        case KEYS.SHIFT:
            if ( (Config.moveForward || Config.moveBackward) && !Config.run ) this.animation.playAnim('Run')
            Config.run = true
            break
        }
    }
}
