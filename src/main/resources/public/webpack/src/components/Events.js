/* eslint-disable require-jsdoc */
import Config from './Config'

export default function load() {
    document.getElementById('noClip').onchange = () => {
        Config.noClip = document.getElementById('noClip').checked
    }
}
