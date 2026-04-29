<script setup>
import { computed } from 'vue'
import { phase, roundResult, next } from '../composables/useGame'

const isVisible = computed(() => phase.value === 'ENDED')
const resultClass = computed(() =>
  roundResult.value.includes('VITÓRIA') ? 'result victory' : 'result defeat'
)
</script>

<template>
  <div v-if="isVisible" class="overlay">
    <h2 :class="resultClass">{{ next }}</h2>
    <button class="btn-next" @click="next">PRÓXIMO ROUND</button>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  z-index: 10;
}

.result {
  font-size: 3rem;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -0.025em;
  margin-bottom: 1.5rem;
}

.victory {
  color: #4ade80;
}

.defeat {
  color: #ef4444;
}

.btn-next {
  background: #ea580c;
  color: #fff;
  border: none;
  padding: 0.75rem 3rem;
  border-radius: 9999px;
  font-size: 1.125rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-next:hover {
  background: #f97316;
}
</style>
