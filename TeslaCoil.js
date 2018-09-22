const GameObject = require('./GameObject')
const _ = require('lodash')

function getParticleRefs(gameObjects) {
  const particleRefs = []

    for (const key in global.gameObjects) {
      if (global.gameObjects[key].tag === 'particle') {
        particleRefs.push(global.gameObjects[key])
      }
    }

    return particleRefs
}

module.exports = class Teslacoil extends GameObject {
  constructor(args) {
    super(args)

    this.radius = 200
    this.location.x = this.location.x - (this.radius / 2)
    this.location.y = this.location.y - (this.radius / 2)

    this.particleRefs = getParticleRefs(global.gameObjects)
    this.particlesToTaze = []

    this.velocity = _.random(0.02, 0.07, true)

    this.direction = _.random(0, 2 * Math.PI, true)

  }
  getClosestParticles() {

    // TODO turn into a circle radius

    const radius = this.radius

    const filtered = this.particleRefs.filter(particle => {

      // 

      const xDistance = Math.abs(particle.location.x - this.location.x)
      const yDistance = Math.abs(particle.location.y - this.location.y)

      // Removes particles that are clearly outside of radius with a simple efficient check
      if (xDistance > radius || yDistance > radius) {
        return false
      }

      // Remove particles that are actually outside of the circle
      // console.log(particle.location.distance(this.location))
      if (particle.location.distance(this.location) > radius) {
        // console.log('triggered')
        return false
      }
      


      return true
    })

    return filtered || []
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

    this.particlesToTaze = this.getClosestParticles()
  }
  render() {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'

    ctx.arc(
      this.location.x, 
      this.location.y, 
      this.radius, 
      0, 
      2 * Math.PI
    )

    this.particlesToTaze.forEach(particle => {

      ctx.moveTo(this.location.x, this.location.y)
      ctx.lineTo(particle.location.x, particle.location.y)

    })
  }
}