/* eslint-disable require-jsdoc */
import Config from './Config'
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
            case 87:
                if ((Config.moveForward || Config.moveBackward)) this.animation.playAnim('stand')
                Config.moveForward = false
                break
            case 65:
                Config.rotateLeft = false
                break
            case 83:
                if ((Config.moveForward || Config.moveBackward)) this.animation.playAnim('stand')
                Config.moveBackward = false
                break
            case 68:
                Config.rotateRight = false
                break
            case 16:
                if (!(Config.moveForward || Config.moveBackward)) this.animation.playAnim('stand')
                else this.animation.playAnim('crwalk')
                Config.run = false
                break
        }
    }
    onKeyDown(event) {
        if (!Config.attack) {
            switch (event.keyCode) {
                case 65:
                    Config.rotateLeft = true
                    break
                case 68:
                    Config.rotateRight = true
                    break
                case 87:
                    if (!(Config.moveForward || Config.run)) this.animation.playAnim('crwalk')
                    else if (Config.run) this.animation.playAnim('run')
                    Config.moveForward = true
                    break
                case 83:
                    if (!(Config.moveBackward || Config.run)) this.animation.playAnim('crwalk')
                    else if (Config.run) this.animation.playAnim('run')
                    Config.moveBackward = true
                    break
                case 32:
                    if (!Config.attack) this.animation.playAnim('attack')
                    Config.attack = true
                    break
                case 16:
                    if ((Config.moveForward || Config.moveBackward) && !Config.run) this.animation.playAnim('run')
                    Config.run = true
                    break
            }
        }
    }
}
