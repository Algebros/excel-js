import {storage} from '../core/utils';
import {defaultStyles, defaultTitle} from '../constants';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

function normalize(state) {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
}

const isStorage = storage('excel-state');

export const initialState = isStorage ? normalize(isStorage) : defaultState;
