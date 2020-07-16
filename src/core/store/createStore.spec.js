import {createStore} from './createStore';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {
      ...state,
      count: state.count + 1,
    };
  }
  return state;
};

describe('createStore:', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test('Should return store object', () => {
    expect(store).toBeDefined();
    expect(store.dispath).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();
  });

  test('Should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('Should return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('Should change state if action exists', () => {
    store.dispath({type: 'ADD'});
    expect(store.getState().count).toBe(1);
  });

  test('Should NOT change state if action dont exists', () => {
    store.dispath({type: 'NOT_EXISTING_ACTION'});
    expect(store.getState().count).toBe(0);
  });

  test('Should call subscriber function', () => {
    store.subscribe(handler);
    store.dispath({type: 'ADD'});

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('Should NOT call sub if unsubscribe', () => {
    const sub = store.subscribe(handler);
    sub.unsubscribe();

    store.dispath({type: 'ADD'});

    expect(handler).not.toHaveBeenCalled();
  });

  test('Should dispath in async way', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.dispath({type: 'ADD'});
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});
