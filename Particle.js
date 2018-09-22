const GameObject = require('./GameObject')
const _ = require('lodash')

module.exports = class Particle extends GameObject {
  constructor(args) {
    super(args)

    this.location = Vector2(
      _.random(0, window.innerWidth),
      _.random(0, window.innerHeight)
    )

    this.velocity = _.random(0.0005, 0.005, true)


    this.tag = 'particle'
  }
  render() {
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'
    ctx.rect(this.location.x, this.location.y, 0.1, 0.1);
  }
  update() {

    const xDiff = Math.cos(this.direction) * (this.velocity * global.timeDelta)
    const yDiff = Math.sin(this.direction) * (this.velocity * global.timeDelta)

    let newLocationX = this.location.x + xDiff
    let newLocationY = this.location.y + yDiff

    if (newLocationX > window.innerWidth) {
       newLocationX = 0
    }

    if (newLocationX < 0 ) {
      newLocationX = window.innerWidth
    }

    if (newLocationY > window.innerHeight) {
       newLocationY = 0
    }

    if (newLocationY < 0) {
       newLocationY = window.innerHeight
    }

    this.location.x = newLocationX
    this.location.y = newLocationY

  }
}