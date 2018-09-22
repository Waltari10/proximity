const Particle = require('./Particle')
const TeslaCoil = require('./TeslaCoil')
const _ = require('lodash')

function createScene () {
  let i = 1000
  const direction = _.random(0, 2 * Math.PI, true)
  while (i--) {
    instantiate(Particle, {
      direction
    })
  }
  instantiate(TeslaCoil, {
    location: Vector2(_.random(0, window.innerWidth), _.random(0, window.innerHeight))
  })
}

module.exports = {
  createScene
}