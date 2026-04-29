import { BaseCharacter } from "./Character";
import { CharacterState } from "./CharacterState";

import NARUTO_SPRITE from "@/assets/sprites/naruto.png";

export class Naruto extends BaseCharacter {
  static SPRITE = NARUTO_SPRITE;
  static DISPLAY_NAME = "Naruto";
  static COST = 3;
  static STATS = { hp: 150, attack: 1.5 };

  constructor(x, y, team) {
    super("Naruto", x, y, team, Naruto.STATS);

    this.config = {
      width: 89,
      height: 89,
      sprite: Naruto.SPRITE,
      animations: {
        [CharacterState.IDLE]: {
          row: 2,
          frameWidth: 90,
          frameHeight: 90,
          frames: 4,
        },
        [CharacterState.RUN]: {
          row: 3,
          frameWidth: 90,
          frameHeight: 90,
          frames: 5,
        },
        [CharacterState.ATTACKING]: {
          row: 9,
          frameWidth: 104,
          frameHeight: 90,
          frames: 6,
        },
      },
    };
  }
}
