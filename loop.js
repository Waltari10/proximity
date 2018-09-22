const { TARGET_FRAME_DURATION } = require('./constants')

function draw() {
  ctx.fillStyle = '#0a0a0a'
  ctx.strokeStyle = '#0a0a0a'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (const key in gameObjects) {
    // ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(Math.floor(gameObjects[key].x), Math.floor(gameObjects[key].y))
    gameObjects[key].render()
    ctx.stroke()
  }
}

function updateGameObjects() {
  for (const key in gameObjects){
    gameObjects[key].update()
  }
}

function loop() {
  const startTime = Date.now()
  updateGameObjects()
  draw()
  const renderTime = Date.now() - startTime
  timeDelta = renderTime < TARGET_FRAME_DURATION ? TARGET_FRAME_DURATION : renderTime
  this.setTimeout(() => {
    loop()
  }, TARGET_FRAME_DURATION - renderTime)
}

module.exports = { loop }