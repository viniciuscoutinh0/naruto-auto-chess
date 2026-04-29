import { BaseCharacter } from "./Character";
import { CharacterState } from "./CharacterState";

import NARUTO_SPRITE from "@/assets/sprites/naruto.png";

export class Naruto extends BaseCharacter {
  constructor(x, y, team) {
    super("Naruto", x, y, team, {
      hp: 150,
      attack: 1.5,
    });

    this.config = {
      width: 89,
      height: 89,
      sprite: NARUTO_SPRITE,
      animations: {
        [CharacterState.IDLE]: 2,
        [CharacterState.RUN]: 3,
        [CharacterState.ATTACKING]: 8,
      },
    };
  }
}
