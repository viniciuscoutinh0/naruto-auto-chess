export function buildGrid() {
  const SIZE = 38;
  const OFFSET_X = 320;
  const OFFSET_Y = 155;

  const cells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      cells.push({
        x: OFFSET_X + c * SIZE * 1.6 + (r % 2) * SIZE * 0.8,
        y: OFFSET_Y + r * SIZE * 1.4,
      });
    }
  }

  return { size: SIZE, offsetX: OFFSET_X, offsetY: OFFSET_Y, cells };
}

export function snapToGrid(grid, nx, ny) {
  let closest = grid.cells[0];
  let minDist = Infinity;

  grid.cells.forEach((c) => {
    const d = Math.hypot(nx + 45 - c.x, ny + 80 - c.y);
    if (d < minDist) {
      minDist = d;
      closest = c;
    }
  });

  return { x: closest.x - 45, y: closest.y - 80 };
}
