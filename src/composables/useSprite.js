import { ref } from "vue";

import BOARD_IMAGE from "@/assets/board.png";

export const useSprite = () => {
  const background = ref(null);

  const loadBackground = () => {
    return new Promise((resolve) => {
      const image = new Image();

      image.src = BOARD_IMAGE;
      image.onload = () => {
        background.value = image;
        resolve();
      };
    });
  };

  return { background, loadBackground };
};
