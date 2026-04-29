<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSprite } from '../composables/useSprite'
import { useDrag } from '../composables/useDrag'
import { findClosestCell } from '../composables/useGrid'
import { playerUnits, enemyUnits, checkRoundEnd, spawnEnemyUnits, preloadUnitSprites, GRID } from '../composables/useGame'

const container = ref(null)
const { background, loadBackground } = useSprite()
let animFrameId = null

const drawDropHighlights = (context) => {
  const dragged = selectedNinja.value
  if (!dragged) return

  const target = findClosestCell(GRID, dragged.x, dragged.y)
  const radius = GRID.size * 0.55

  GRID.cells.forEach((cell) => {
    const isTarget = cell === target
    context.beginPath()
    context.ellipse(cell.x, cell.y, radius, radius * 0.5, 0, 0, Math.PI * 2)
    context.fillStyle = isTarget ? 'rgba(234, 179, 8, 0.35)' : 'rgba(234, 179, 8, 0.08)'
    context.fill()
    context.lineWidth = isTarget ? 2.5 : 1
    context.strokeStyle = isTarget ? 'rgba(234, 179, 8, 0.95)' : 'rgba(234, 179, 8, 0.4)'
    context.stroke()
  })
}

const gameLoop = () => {
  const canvas = container.value
  if (!canvas) return

  const context = canvas.getContext('2d')

  background.value
    ? context.drawImage(background.value, 0, 0, canvas.width, canvas.height)
    : context.clearRect(0, 0, canvas.width, canvas.height)

  drawDropHighlights(context)

    ;[...playerUnits]
      .sort((a, b) => a.y - b.y)
      .forEach((char) => {

        char.update(enemyUnits)
        char.draw(context, char.sprite)
      })

    ;[...enemyUnits]
      .sort((a, b) => a.y - b.y)
      .forEach((char) => {
        char.update(playerUnits)
        char.draw(context, char.sprite)
      })

  checkRoundEnd()
  animFrameId = requestAnimationFrame(gameLoop)
}

const { attachListeners, detachListeners, selectedNinja } = useDrag(container, GRID)

onMounted(async () => {
  attachListeners()

  await Promise.all([loadBackground(), preloadUnitSprites()])
  await spawnEnemyUnits()

  gameLoop()
})

onUnmounted(() => {
  detachListeners()
  if (animFrameId) cancelAnimationFrame(animFrameId)
})
</script>
<template>
  <div class="canvas-wrapper">
    <canvas ref="container" width="1024" height="576" class="prep-cursor game-canvas" />
    <slot />
  </div>
</template>

<style scoped>
.canvas-wrapper {
  position: relative;
  background: #18181b;
  padding: 0.5rem;
  border-radius: 1rem;
  border: 4px solid #27272a;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.game-canvas {
  display: block;
  border-radius: 0.5rem;
}
</style>
