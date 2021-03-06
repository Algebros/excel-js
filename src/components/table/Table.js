import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {getGroupSelection, nextSelector} from './utils';
import * as actions from '../../redux/actions';
import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';

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
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$on('Formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value));
      this.updateTextInStore(value);
    });
    this.$on('Formula:pressButton', (key) => this.onFormula(key));
    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispath(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('Table:select', $cell);
    const styles =$cell.getStyles(Object.keys(defaultStyles));
    this.$dispath(actions.changeStyles(styles));
  }

  onFormula(key) {
    this.selection.current.focus();
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispath(actions.tableResize(data));
    } catch (error) {
      console.warn(error);
    }
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.resizeTable(event);
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

  updateTextInStore(value) {
    this.$dispath(actions.changeText({
      id: this.selection.current.id(),
      value,
    }));
  }

  onInput(event) {
    // this.$emit('Table:input', $(event.target));
    this.updateTextInStore($(event.target).text());
  }
}
