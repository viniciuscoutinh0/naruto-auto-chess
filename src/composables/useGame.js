import { ref, reactive } from "vue";
import { Pain } from "../entities/pain";
import { buildGrid } from "./useGrid";
import { Naruto } from "../entities/Naruto";

export const phase = ref("PREP"); // 'PREP' | 'BATTLE' | 'ENDED'
export const round = ref(1);
export const gold = ref(10);
export const playerUnits = reactive([]);
export const enemyUnits = reactive([]);
export const roundResult = ref(""); // 'VITÓRIA!' | 'DERROTA...'
export const GRID = buildGrid();

export async function spawnEnemyUnits() {
  enemyUnits.splice(0);

  const count = Math.min(8, 1 + Math.floor(round.value / 1.5));

  for (let i = 0; i < count; i++) {
    const n = new Pain(
      650 + Math.random() * 150,
      150 + Math.random() * 200,
      "enemy",
    );
    await n.loadSprite();
    enemyUnits.push(n);
  }
}

export async function buyUnit() {
  if (gold.value < 3 || phase.value !== "PREP") return;
  gold.value -= 3;

  const unit = new Naruto(
    150 + Math.random() * 50,
    400 + Math.random() * 30,
    "player",
  );
  await unit.loadSprite(); // carrega antes de entrar no array
  playerUnits.push(unit);
}

export const start = () => {
  if (phase.value !== "PREP" || playerUnits.length === 0) return;

  phase.value = "BATTLE";
};

export const next = () => {
  round.value++;
  phase.value = "PREP";
  playerUnits.forEach((u) => u.reset());
  spawnEnemyUnits();
};

export const checkRoundEnd = () => {
  if (phase.value !== "BATTLE") return;

  const enemiesAlive = enemyUnits.some((u) => !u.isDead);
  const playersAlive = playerUnits.some((u) => !u.isDead);

  if (!enemiesAlive) {
    roundResult.value = "VITÓRIA!";
    gold.value += 5 + round.value;
  } else if (!playersAlive) {
    roundResult.value = "DERROTA...";
    gold.value += 3;
  }
};
