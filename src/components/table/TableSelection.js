export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
  }

  // $el instanceof Dom === true
  select($el) {
    this.clear();
    this.group.push($el);
    $el.addClass(TableSelection.className);
  }

  selectGroup($elements = []) {
    this.clear();
    this.group.push(...$elements);
    this.group.map((el) => console.log(el.$el));
    $elements.map(($el) => $el.addClass(TableSelection.className));
  }

  clear() {
    this.group.map((el) => el.removeClass(TableSelection.className));
    this.group = [];
  }
}
