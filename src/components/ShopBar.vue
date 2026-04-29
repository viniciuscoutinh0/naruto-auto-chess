<script setup>
import { computed } from 'vue'
import { phase, playerUnits, buyUnit, start } from '../composables/useGame'

const canBuy = computed(() => phase.value === 'PREP')
const canFight = computed(() => phase.value === 'PREP' && playerUnits.length > 0)
</script>

<template>
  <div class="shop-bar">
    <!-- Loja de unidades -->
    <div class="shop-panel">
      <button class="unit-card" :disabled="!canBuy" @click="buyUnit">
        <div class="unit-name">PAIN</div>
        <div class="unit-cost">Custo: 3G</div>
        <div class="unit-buy-label">COMPRAR</div>
      </button>
      <span class="shop-hint">Mais Akatsuki em breve...</span>
    </div>

    <!-- Botão lutar -->
    <button class="btn-fight" :disabled="!canFight" @click="start">
      Lutar!
    </button>
  </div>
</template>

<style scoped>
.shop-bar {
  width: 100%;
  max-width: 1024px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  margin-top: 1.5rem;
}

.shop-panel {
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.unit-card {
  flex-shrink: 0;
  width: 9rem;
  background: #27272a;
  border: 2px solid #3f3f46;
  border-radius: 0.5rem;
  padding: 0.75rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.unit-card:hover:not(:disabled) {
  background: #3f3f46;
  border-color: #52525b;
}

.unit-card:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.unit-name {
  font-size: 1.125rem;
  font-weight: 900;
  font-style: italic;
  color: #eab308;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.unit-cost {
  font-size: 0.75rem;
  color: #a1a1aa;
  text-transform: uppercase;
}

.unit-buy-label {
  margin-top: 0.75rem;
  background: rgba(202, 138, 4, 0.2);
  color: #eab308;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
  padding: 0.2rem 0;
  border-radius: 0.25rem;
}

.shop-hint {
  color: #3f3f46;
  font-style: italic;
  font-size: 0.875rem;
}

.btn-fight {
  background: #16a34a;
  color: #fff;
  border: none;
  border-bottom: 6px solid #15803d;
  border-radius: 0.75rem;
  font-size: 1.25rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  padding: 0 2rem;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.btn-fight:hover:not(:disabled) {
  background: #22c55e;
}

.btn-fight:active:not(:disabled) {
  transform: translateY(2px);
  border-bottom-width: 4px;
}

.btn-fight:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
