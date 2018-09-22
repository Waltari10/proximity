const _ = require('lodash')
const uniqid = require('uniqid')
const Victor = require('victor')
const { loop } = require('./loop')
const { TARGET_FPS } = require('./constants')
const { createScene } = require('./ParticleScene')

let obstacles = []


global.Vector2 = function (x, y) { return new Victor(x, y) }
global.canvas = document.getElementById('canvas')
global.ctx = canvas.getContext('2d')
global.timeDelta = 1000 / TARGET_FPS
global.gameObjects = {}
global.instantiate = function (classTemplate, args) {
  const id = uniqid()
  const instance = new classTemplate(Object.assign({ id }, args))
  gameObjects[id] = instance
  return instance
}
global.destroy = function (instance) {
  delete gameObjects[instance.id]
}

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

window.addEventListener('resize', resizeCanvas, false)
resizeCanvas()
createScene()
loop()
