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
