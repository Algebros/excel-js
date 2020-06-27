const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_, index) {
  return `
    <div class="cell" contenteditable data-col="${index}"></div>
  `;
}

function toColumn(letter, index) {
  return `<div class="column" data-type="resizable" data-col="${index}">
    ${letter}
    <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function createRow(content, index) {
  // eslint-disable-next-line max-len
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
   <div class="row" data-type="resizable">
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
