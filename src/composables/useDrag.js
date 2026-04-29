import { ref } from "vue";
import { phase, playerUnits } from "./useGame";
import { snapToGrid } from "./useGrid";

export function useDrag(canvasRef, grid) {
  const selectedNinja = ref(null);

  function onMouseDown(e) {
    if (phase.value !== "PREP") return;
    const rect = canvasRef.value.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    playerUnits.forEach((n) => {
      if (mx > n.x && mx < n.x + 89 && my > n.y && my < n.y + 89) {
        selectedNinja.value = n;
      }
    });
  }

  function onMouseMove(e) {
    if (!selectedNinja.value) return;
    const rect = canvasRef.value.getBoundingClientRect();
    selectedNinja.value.x = e.clientX - rect.left - 45;
    selectedNinja.value.y = e.clientY - rect.top - 45;
  }

  function onMouseUp() {
    if (!selectedNinja.value) return;
    const snapped = snapToGrid(
      grid,
      selectedNinja.value.x,
      selectedNinja.value.y,
    );
    selectedNinja.value.x = snapped.x;
    selectedNinja.value.y = snapped.y;
    selectedNinja.value.startX = snapped.x;
    selectedNinja.value.startY = snapped.y;
    selectedNinja.value = null;
  }

  function attachListeners() {
    canvasRef.value.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function detachListeners() {
    canvasRef.value?.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  return { attachListeners, detachListeners };
}
