import {storage} from '../core/utils';
import {defaultStyles} from '../constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

const isStorage = storage('excel-state');

export const initialState = isStorage ? isStorage : defaultState;
