import {Router} from './Router';
import {Page} from '../Page';

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'dashBoard';
    return root;
  }
}
class ExcelPage extends Page {}

describe('Router:', () => {
  let router;
  let $root;

  beforeEach(() => {
    $root = document.createElement('div');
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    });
  });

  test('Should be defined', () => {
    expect(router).toBeDefined();
  });

  test('Should render Dashboard Page', () => {
    router.changePageHandler();
    expect($root.innerHTML).toBe('<div>dashBoard</div>');
  });
});
