import {DomListener} from './DomListener';
import {TableSelection} from '../components/table/TableSelection';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.prepare();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
