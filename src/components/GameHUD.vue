<script setup>
import { computed } from 'vue'
import { phase, round, gold } from '../composables/useGame'

const phaseLabel = computed(() => phase.value === 'BATTLE' ? 'Fase: Batalha' : 'Fase: Preparação')
const phaseClass = computed(() =>
  phase.value === 'BATTLE'
    ? 'phase-badge phase-battle'
    : 'phase-badge phase-prep'
)
</script>

<template>
  <div class="hud">
    <div class="hud-left">
      <h1 class="hud-title">Konoha Battle Arena</h1>
      <div class="hud-round">ROUND: {{ round }}</div>
      <span :class="phaseClass">{{ phaseLabel }}</span>
    </div>
    <div class="hud-right">
      <span class="hud-gold-label">Ouro</span>
      <span class="hud-gold">{{ gold }}G</span>
    </div>
  </div>
</template>

<style scoped>
.hud {
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.hud-title {
  font-size: 1.875rem;
  font-weight: 900;
  color: #f97316;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  line-height: 1;
}

.hud-round {
  font-family: monospace;
  font-size: 0.75rem;
  color: #71717a;
  margin-top: 0.25rem;
}

.phase-badge {
  display: inline-block;
  padding: 0.15rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0.5rem;
}

.phase-prep  { background: #2563eb; color: #fff; }
.phase-battle { background: #dc2626; color: #fff; }

.hud-right {
  text-align: right;
}
.hud-gold-label {
  display: block;
  color: #71717a;
  font-size: 0.625rem;
  text-transform: uppercase;
}
.hud-gold {
  font-size: 2.25rem;
  font-weight: 700;
  color: #eab308;
}
</style>
