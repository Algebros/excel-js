import {$} from '../../core/dom';

export function getGroupSelection(firstCell, lastCell) {
  let [firstX, firstY] = firstCell.id(true);
  let [secondX, secondY] = lastCell.id(true);
  if (firstX === secondX && firstY === secondY) return [];

  if (firstX > secondX) [firstX, secondX] = [secondX, firstX];
  if (firstY > secondY) [firstY, secondY] = [secondY, firstY];

  const $elements = [];
  for (let x = firstX; x <= secondX; x++) {
    for (let y = firstY; y <= secondY; y++) {
      $elements.push($(document.querySelector(`[data-id="${x}:${y}"]`)));
    }
  }

  return $elements;
}

export function nextSelector(key, [row, col]) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;

    case 'Tab':
    case 'ArrowRight':
      col++;
      break;

    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;

    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;

    default:
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
