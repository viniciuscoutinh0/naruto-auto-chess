import { BaseCharacter } from "./Character";
import { CharacterState } from "./CharacterState";

import PAIN_SPRITE from "@/assets/sprites/pain.png";

export class Pain extends BaseCharacter {
  static SPRITE = PAIN_SPRITE;
  static DISPLAY_NAME = "Pain";
  static COST = 4;
  static STATS = { hp: 180, attack: 1.8 };

  constructor(x, y, team) {
    super("Pain", x, y, team, Pain.STATS);

    this.config = {
      width: 89,
      height: 89,
      sprite: Pain.SPRITE,
      animations: {
        [CharacterState.IDLE]:      { row: 0, frameWidth: 89, frameHeight: 89, frames: 5 },
        [CharacterState.RUN]:       { row: 1, frameWidth: 89, frameHeight: 89, frames: 5 },
        [CharacterState.ATTACKING]: { row: 2, frameWidth: 89, frameHeight: 89, frames: 5 },
      },
    };
  }
}
