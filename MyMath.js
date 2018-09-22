const defaultAcceleration = 9.81
const airDensity = 1.225 // kg/m3
const circleDragCoefficient = 0.47
const streamlinedBodyCoefficient = 0.04
const crossSectionalArea = 1

function getClosestPointDumb(pointsArr) {
  
}

module.exports = {
  getDistance: function (time, acceleration = defaultAcceleration) {
    return acceleration * Math.pow(time / 1000, 2) / 2
  },
  getVelocity: function (time, initialVelocity = 0, acceleration = defaultAcceleration) {
    return initialVelocity + (acceleration * time)
  },
  getForce: function (weight, acceleration = defaultAcceleration) {
    return weight * acceleration
  },
  getDrag: function (velocity) { // drag returns force in newton
    return 0.5 * airDensity * Math.pow(velocity, 2) * crossSectionalArea * streamlinedBodyCoefficient
  },
  getXOnCircle: function (radius, radian, x) {
    return radius * Math.cos(radian) + x
  },
  getYOnCircle: function (radius, radian, y) {
    return radius * Math.sin(radian) + y
  },
  getPosOnCircle(radius, radian, vector2) {    
    return Vector2(radius * Math.cos(radian) + vector2.x, radius * Math.sin(radian) + vector2.y)
  },
  radToDegree: function(rad) {
    return rad * (180 / Math.PI)
  },
  degreeToRad: function(degree) {
    return degree / (180 / Math.PI)
  },
}