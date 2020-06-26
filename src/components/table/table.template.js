const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function toColumn(letter) {
  return `<div class="column">
    ${letter}
    <div class="col-resize"></div>
  </div>`;
}

function createRow(content, index) {
  const resize = index ? '<div class="row-resize"></div>' : '';
  return `
   <div class="row">
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

export function createTable(rowsAmount = 15) {
  const colsAmount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsAmount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsAmount; i++) {
    const cells = new Array(colsAmount)
        .fill('')
        .map(toCell)
        .join('');
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
