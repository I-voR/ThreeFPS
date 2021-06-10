/* eslint-disable require-jsdoc */
import './style.css'
import Main from './components/Main'

function init(map) {
    const container = document.getElementById('root')
    new Main(container, map)
}

var xhr = new XMLHttpRequest()
xhr.open('POST', '/load', true)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send()

xhr.onload = function() {
    init(JSON.parse(this.responseText))
}
