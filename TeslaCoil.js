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

    this.particleRefs = getParticleRefs(global.gameObjects)
    this.particlesToTaze = []

    this.velocity = 0.03

    this.direction = _.random(0, 2 * Math.PI, true)

  }
  getClosestParticles(location) {

    const filtered = this.particleRefs.filter(particle => {

      const xDistance = Math.abs(particle.location.x - location.x)
      const yDistance = Math.abs(particle.location.y - location.y)

      // Removes particles that are clearly outside of radius with a simple efficient check
      if (xDistance > this.radius || yDistance > this.radius) {
        return false
      }

      // Remove particles that are actually outside of the circle
      if (particle.location.distance(location) > this.radius) {
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

    if (newLocationX < 0) {
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
  renderCircle(location) {
    ctx.moveTo(location.x, location.y)
    ctx.arc(
      location.x,
      location.y,
      this.radius,
      0,
      2 * Math.PI
    )
  }
  renderRays(location) {
    const particles = this.getClosestParticles(location)
    particles.forEach(particle => {
      ctx.moveTo(location.x, location.y)
      ctx.lineTo(particle.location.x, particle.location.y)
      ctx.moveTo(location.x, location.y)
    })
  }
  isCircleOOBLeft() {
    return this.location.x - this.radius < 0
  }
  isCircleOOBRight() {
    return this.location.x + this.radius > window.innerWidth
  }
  isCircleOOBTop() {
    return this.location.y - this.radius < 0
  }
  isCircleOOBBottom() {
    return this.location.y + this.radius > window.innerHeight
  }
  render() {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'

    this.renderCircle(this.location)
    this.renderRays(this.location)

    // Render circle on left side of screen.      
    if (this.isCircleOOBLeft()) {
      // console.log('render on right')
      const circleLocation = Vector2(this.location.x + window.innerWidth, this.location.y)
      this.renderCircle(circleLocation)
      this.renderRays(circleLocation)
    }

    if (this.isCircleOOBRight()) {
      // console.log('render on left')
      const circleLocation = Vector2(this.location.x - window.innerWidth, this.location.y)
      this.renderCircle(circleLocation)
      this.renderRays(circleLocation)
    }

    if (this.isCircleOOBTop()) {
      // console.log('render on bottom')
      const circleLocation = Vector2(this.location.x, this.location.y + window.innerHeight)
      this.renderCircle(circleLocation)
      this.renderRays(circleLocation)
    }

    if (this.isCircleOOBBottom()) {
      // console.log('render on top')
      const circleLocation = Vector2(this.location.x, this.location.y - window.innerHeight)
      this.renderCircle(circleLocation)
      this.renderRays(circleLocation)
    }

    if (
      this.isCircleOOBLeft() &&
      this.isCircleOOBTop() < 0
    ) {
      // console.log('render on bottom right')
      const circleLocation = Vector2(this.location.x + window.innerWidth, this.location.y + window.innerHeight)
      this.renderCircle(circleLocation)
      this.renderRays(circleLocation)
    }

    if (
      this.isCircleOOBTop() &&
      this.isCircleOOBRight()
    ) {
      // console.log('render on bottom left')
      const circleLocation = Vector2(this.location.x - window.innerWidth, this.location.y + window.innerHeight)
      this.renderCircle(circleLocation)
      this.renderRays(circleLocation)
    }

    if (
      this.isCircleOOBBottom() &&
      this.isCircleOOBRight()
    ) {
      // console.log('render on top left')
      const circleLocation = Vector2(this.location.x - window.innerWidth, this.location.y - window.innerHeight)
      this.renderCircle(circleLocation)
      this.renderRays(circleLocation)
    }


    if (
      this.isCircleOOBBottom() &&
      this.isCircleOOBLeft()
    ) {
      // console.log('render on top right')
      const circleLocation = Vector2(this.location.x + window.innerWidth, this.location.y - window.innerHeight)
      this.renderCircle(circleLocation)
      this.renderRays(circleLocation)
    }
  }
}