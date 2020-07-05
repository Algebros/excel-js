import {storage} from '../core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
};

const isStorage = storage('excel-state');

export const initialState = isStorage ? isStorage : defaultState;
