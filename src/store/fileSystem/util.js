export const simulateWaterFlow = (grid, startCell) => {
  console.log(startCell);

  if (grid[startCell.x][startCell.y] === 0) {
    grid[startCell.x][startCell.y] = 1;
  }

  if (startCell.x === grid.length - 1) {
    return grid;
  }
  if (grid[startCell.x + 1][startCell.y] === 0) {
    return simulateWaterFlow(grid, { x: startCell.x + 1, y: startCell.y });
  }
  if (startCell.x !== 0 && grid[startCell.x + 1][startCell.y] === -1) {
    if (grid[startCell.x][startCell.y + 1] === 0) {
      grid = simulateWaterFlow(grid, { x: startCell.x, y: startCell.y + 1 });
    }
    if (grid[startCell.x][startCell.y - 1] === 0) {
      grid = simulateWaterFlow(grid, { x: startCell.x, y: startCell.y - 1 });
    }
    return grid;
  }
  return grid;
};
