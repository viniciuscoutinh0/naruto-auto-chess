import { phase } from "../composables/useGame.js";
import { CharacterState } from "./CharacterState.js";

const ANIMATION_SPEED = 10;
const ANIMATION_FRAMES = 5;
const MOVE_SPEED = 2.2;
const ATTACK_RANGE = 40;

export class BaseCharacter {
  constructor(name, x, y, team, stats = {}) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.team = team;
    this.hp = stats.hp ?? 100;
    this.maxHp = this.hp;
    this.attack = stats.attack ?? 0.8;
    this.mana = stats.mana ?? 0;
    this.isDead = false;
    this.state = CharacterState.IDLE;
    this.frame = 0;
    this.tick = 0;
    this.sprite = null;
    this.config = null;
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.hp = this.maxHp;
    this.isDead = false;
    this.state = CharacterState.IDLE;
    this.frame = 0;
    this.tick = 0;
  }

  update(opponents) {
    if (this.isDead || phase.value !== "BATTLE") {
      return;
    }

    this._advanceAnimation();

    const target = opponents.filter((o) => !o.isDead);

    if (target.length === 0) {
      this.state = CharacterState.IDLE;
      return;
    }

    const closest = this._findClosest(target);

    if (!closest) return;

    const dx = closest.x - this.x;
    const dy = closest.y - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist > this._attackRange()) {
      this._moveTo(dx, dy);
    } else {
      this._attack(closest);
    }
  }

  draw(context, sprite) {
    if (this.isDead) return;

    this._drawShadow(context);

    this._drawSprite(context, sprite);

    this._drawHpBar(context);
  }

  async loadSprite() {
    if (!this.config?.sprite) return;

    const image = new Image();

    image.src = this.config.sprite;

    await new Promise((resolve) => (image.onload = resolve));

    this.sprite = image;
  }

  _advanceAnimation() {
    this.tick++;

    if (this.tick >= ANIMATION_SPEED) {
      this.frame = (this.frame + 1) % ANIMATION_FRAMES;
      this.tick = 0;
    }
  }

  _findClosest(targes) {
    let closest = null;
    let minDist = Infinity;

    targes.forEach((target) => {
      const dist = Math.hypot(this.x - target.x, this.y - target.y);
      if (dist < minDist) {
        minDist = dist;
        closest = target;
      }
    });

    return closest;
  }

  _moveTo(dx, dy) {
    this.state = CharacterState.RUN;

    const angle = Math.atan2(dy, dx);

    this.x += Math.cos(angle) * MOVE_SPEED;
    this.y += Math.sin(angle) * MOVE_SPEED;
  }

  _attack(target) {
    this.state = CharacterState.ATTACKING;
    target.hp -= this.attack;

    if (target.hp <= 0) {
      target.isDead = true;
    }
  }

  _attackRange() {
    return ATTACK_RANGE;
  }

  _drawShadow(context) {
    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    context.beginPath();
    context.ellipse(this.x, this.y + 20, 20, 10, 0, 0, Math.PI * 2);
    context.fill();
  }

  _drawSprite(context, sprite) {
    if (!sprite || !this.config) {
      return;
    }

    const row = this.config.animations[this.state] ?? 0;

    context.save();

    if (this.team === "enemy") {
      context.translate(this.x + this.config.width, this.y);
      context.scale(-1, 1);
    } else {
      context.translate(this.x, this.y);
    }

    context.imageSmoothingEnabled = false;

    context.drawImage(
      sprite,
      this.frame * this.config.width,
      row * this.config.height,
      this.config.width,
      this.config.height,
      0,
      0,
      this.config.width,
      this.config.height,
    );

    context.restore();
  }

  _drawHpBar(context) {
    const BAR_X = this.x + 25;
    const BAR_Y = this.y - 5;
    const BAR_W = 40;

    context.fillStyle = "#18181b";
    context.fillRect(BAR_X, BAR_Y, BAR_W, 4);

    context.fillStyle = this.team === "player" ? "#22c55e" : "#ef4444";
    context.fillRect(BAR_X, BAR_Y, BAR_W * (this.hp / this.maxHp), 4);
  }
}
