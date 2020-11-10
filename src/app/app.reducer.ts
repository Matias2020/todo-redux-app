import {Todo} from './todos/models/todo.model';
import {ActionReducerMap} from '@ngrx/store';
import {todoReducer} from './todos/todo.reducer';
import {filtrosValidos} from './filter/filter.actions';
import {filterReducer} from './filter/filter.reducers';

export interface AppState {
  todos: Todo[];
  filtro: filtrosValidos;
};

export const AppReducers: ActionReducerMap<AppState> = {

  todos: todoReducer,
  filtro: filterReducer
};
