import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {getGroupSelection} from './utils';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
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
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeHandler(this.$root, event);
    } else if (event.target.dataset.type === 'cell') {
      const $target = $(event.target);
      this.selection.select($target);
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
}
