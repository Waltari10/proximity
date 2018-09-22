const {
  getVelocity,
  getForce,
  getDrag,
} = require('./MyMath')

module.exports = class GameObject {
  constructor({
    id,
    location = Vector2(0, 0),
    direction = 0,
  } = {}) {
    this.location = location
    this.id = id
    this.direction = direction
  }
  render() {}
  update() {}
}