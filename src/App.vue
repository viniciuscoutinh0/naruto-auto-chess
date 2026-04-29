<script setup>
import GameHUD from './components/GameHUD.vue'
import GameCanvas from './components/GameCanvas.vue'
import RoundOverlay from './components/RoundOverlay.vue'
import ShopBar from './components/ShopBar.vue'
</script>

<template>
  <main class="layout">
    <GameHUD />

    <GameCanvas>
      <RoundOverlay />
    </GameCanvas>

    <ShopBar />
  </main>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  min-height: 100vh;
}
</style>
