import { createReducer, on } from '@ngrx/store';
import {filtrosValidos, setFiltro} from './filter.actions';


export const initialState: filtrosValidos = 'todos';

const _filterReducer = createReducer(initialState,
  on(setFiltro, (state, { filtro}) => filtro)
);

export function filterReducer(state, action) {
  return _filterReducer(state, action);
}
