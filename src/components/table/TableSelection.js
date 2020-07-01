export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    this.current = $el;
    this.group.push($el);
    $el.focus().addClass(TableSelection.className);
  }

  selectGroup($elements = []) {
    this.clear();
    this.group.push(...$elements);
    $elements.map(($el) => $el.addClass(TableSelection.className));
  }

  clear() {
    this.group.map((el) => el.removeClass(TableSelection.className));
    this.group = [];
  }
}
