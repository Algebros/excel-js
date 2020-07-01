import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {getGroupSelection, nextSelector} from './utils';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$on('Formula:input', (data) => this.selection.current.text(data));
    this.$on('Formula:pressButton', (key) => this.onFormula(key));
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('Table:input', $cell);
  }

  onFormula(key) {
    this.selection.current.focus();
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeHandler(this.$root, event);
    } else if (event.target.dataset.type === 'cell') {
      const $target = $(event.target);
      this.selectCell($target);
      let mouseoverTarget;

      this.$root.$el.onmouseover = (event) => {
        if (!event.target.dataset.id) return;
        mouseoverTarget = $(event.target);
      };

      this.$root.$el.onmouseup = () => {
        if (mouseoverTarget) {
          const $cells = getGroupSelection($target, mouseoverTarget);
          this.selection.selectGroup($cells);
        }

        this.$root.$el.onmouseover = null;
        this.$root.$el.onmouseup = null;
      };
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('Table:input', $(event.target));
  }
}
