import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('Table:select', ($cell) => {
      this.$formula.text($cell.text());
    });

    // this.$on('Table:input', ($cell) => {
    //   this.$formula.text($cell.text());
    // });

    this.$subscribe((state) => {
      console.log(state.currentText);
      this.$formula.text(state.currentText);
    });
  }

  onInput(event) {
    this.$emit('Formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
    ];

    const {key} = event;

    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('Formula:pressButton', key);
    }
  }
}
