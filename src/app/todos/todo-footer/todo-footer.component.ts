import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {filtrosValidos, setFiltro} from '../../filter/filter.actions';
import {limpiar} from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filterActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos','completados', 'pendientes'];
  pendientes:number = 0;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    //this.store.select('filtro').subscribe(filtro => this.filterActual = filtro);
    this.store.subscribe(state =>{
      this.filterActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }

  cambiarFiltro(filtro: filtrosValidos){
    console.log(filtro);
    this.store.dispatch(setFiltro({ filtro: filtro}));
  }

  limpiarCompletados(){
    this.store.dispatch(limpiar());
  }

}
