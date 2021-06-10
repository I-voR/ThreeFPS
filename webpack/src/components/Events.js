/* eslint-disable require-jsdoc */
import Config from './Config.js'

export default function load() {
    document.getElementById('noClip').onchange = () => {
        Config.noClip = document.getElementById('noClip').checked
    }

    document.getElementById('cameraX').onmousemove = () => {
        Config.cameraX = document.getElementById('cameraX').value
    }

    document.getElementById('cameraY').onmousemove = () => {
        Config.cameraY = document.getElementById('cameraY').value
    }

    document.getElementById('light').onmousemove = () => {
        Config.light = document.getElementById('light').value
    }
}
