import { BaseCharacter } from "./Character";
import { CharacterState } from "./CharacterState";

import SASUKE_SPRITE from "@/assets/sprites/sasuke.png";

export class Sasuke extends BaseCharacter {
  static SPRITE = SASUKE_SPRITE;
  static DISPLAY_NAME = "Sasuke";
  static COST = 3;
  static STATS = { hp: 150, attack: 1.5 };

  constructor(x, y, team) {
    super("Sasuke", x, y, team, Sasuke.STATS);

    this.config = {
      width: 89,
      height: 89,
      sprite: Sasuke.SPRITE,
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
