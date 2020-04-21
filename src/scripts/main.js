'use strict';

const field = document.querySelector('.field');
const cellSize = 80;

const emptyCell = {
  value: 0,
  left: 0,
  top: 0,
};

const cells = [];

cells.push(emptyCell);

function moveCell(index) {
  const cell = cells[index];
  const leftDiff = Math.abs(emptyCell.left - cell.left);
  const topDiff = Math.abs(emptyCell.top - cell.top);

  if (leftDiff + topDiff > 1) {
    return;
  }

  cell.element.style.top = `${emptyCell.top * cellSize}px`;
  cell.element.style.left = `${emptyCell.left * cellSize}px`;

  const emptyLeft = emptyCell.left;
  const emptyTop = emptyCell.top;

  emptyCell.left = cell.left;
  emptyCell.top = cell.top;
  cell.top = emptyTop;
  cell.left = emptyLeft;

  const finish = cells.every(c => {
    return c.value === c.top * 4 + c.left;
  });

  if (finish) {
    alert('YOU WON!!!');
  }
}

const random15 = [...Array(15).keys()]
  .sort(() => Math.random() - 0.5);

for (let i = 1; i <= 15; i++) {
  const cell = document.createElement('div');

  cell.className = 'number';
  cell.innerHTML = random15[i - 1] + 1;

  const cellLeft = i % 4;
  const cellTop = (i - cellLeft) / 4;
  const value = random15[i - 1] + 1;

  cells.push({
    value: value,
    left: cellLeft,
    top: cellTop,
    element: cell,
  });

  cell.style.top = `${cellTop * cellSize}px`;
  cell.style.left = `${cellLeft * cellSize}px`;

  field.append(cell);

  cell.addEventListener('click', () => {
    moveCell(i);
  });

  const button = document.querySelector('button');

  button.addEventListener('click', function() {
    location.reload();
  });
}
