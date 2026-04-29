import { BaseCharacter } from "./Character";
import { CharacterState } from "./CharacterState";

import PAIN_SPRITE from "@/assets/sprites/pain.png";

export class Pain extends BaseCharacter {
  constructor(x, y, team) {
    super("Pain", x, y, team, {
      hp: 150,
      attack: 1.5,
    });

    this.config = {
      width: 89,
      height: 89,
      sprite: PAIN_SPRITE,
      animations: {
        [CharacterState.IDLE]: 0,
        [CharacterState.RUN]: 1,
        [CharacterState.ATTACKING]: 2,
      },
    };
  }
}
