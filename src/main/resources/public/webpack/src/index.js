import './style.css'
import Main from './components/Main';
function init(map) {
    const container = document.getElementById('root')
    new Main(container, map)
}
var xhr = new XMLHttpRequest()
xhr.open("POST", "/load", true)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send()
xhr.onload = function () {
    console.log(this.responseText)
    console.log(JSON.parse(this.responseText))
    init(JSON.parse(this.responseText))
}