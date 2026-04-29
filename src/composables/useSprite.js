import { ref } from "vue";

import BOARD_IMAGE from "@/assets/board.png";

const imageCache = new Map();

export function loadImage(src) {
  let entry = imageCache.get(src);
  if (entry) return entry;

  entry = new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

  imageCache.set(src, entry);
  return entry;
}

export function preloadImages(srcs) {
  return Promise.all(srcs.map(loadImage));
}

export const useSprite = () => {
  const background = ref(null);

  const loadBackground = async () => {
    background.value = await loadImage(BOARD_IMAGE);
  };

  return { background, loadBackground };
};
