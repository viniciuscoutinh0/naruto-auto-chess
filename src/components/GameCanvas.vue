<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSprite } from '../composables/useSprite'
import { useDrag } from '../composables/useDrag'
import { playerUnits, enemyUnits, checkRoundEnd, spawnEnemyUnits, GRID } from '../composables/useGame'

const container = ref(null)
const { background, loadBackground } = useSprite()
let animFrameId = null

const gameLoop = () => {
  const canvas = container.value
  if (!canvas) return

  const context = canvas.getContext('2d')

  background.value
    ? context.drawImage(background.value, 0, 0, canvas.width, canvas.height)
    : context.clearRect(0, 0, canvas.width, canvas.height)

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

const { attachListeners, detachListeners } = useDrag(container, GRID)

onMounted(async () => {
  attachListeners()

  await loadBackground()
  spawnEnemyUnits()

  // carrega sprites uma única vez antes do loop começar
  await Promise.all(
    [...playerUnits, ...enemyUnits].map(n => n.loadSprite())
  )


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
