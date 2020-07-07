import {toInlineStyles} from '../../core/utils';
import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(row, state) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    const width = getWidth(state, col);
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });

    return `
      <div
        class="cell"
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width: ${width};"
      >${parse(data) || ''}</div>
     `;
  };
}

function toColumn(state) {
  return function(letter, index) {
    const width = getWidth(state, index);
    return `
    <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${letter}
      <div class="col-resize" data-resize="col"></div>
    </div>`;
  };
}

function createRow(content, index, state) {
  const height = index ? getHeight(state, index) : '';
  const resize = index ?
  '<div class="row-resize" data-resize="row"></div>' : '';

  return `
  <div
    class="row"
    data-type="resizable"
    data-row="${index || ''}"
    style="height: ${height}"
  >
    <div class="row-info">
      ${index || ''}
      ${resize}
    </div>
    <div class="row-data">${content}</div>
   </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return (state.colState[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state.rowState[index] || DEFAULT_HEIGHT) + 'px';
}

export function createTable(rowsAmount = 15, state = {}) {
  const colsAmount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsAmount)
      .fill('')
      .map(toChar)
      .map(toColumn(state))
      .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsAmount; row++) {
    const cells = new Array(colsAmount)
        .fill('')
        .map(toCell(row, state))
        .join('');
    rows.push(createRow(cells, row + 1, state));
  }

  return rows.join('');
}
