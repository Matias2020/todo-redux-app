import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../models/todo.model';
import {FormControl, Validators} from '@angular/forms';
import {timeout} from 'rxjs/operators';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {borrar, editar, toggle} from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input()
  public todo: Todo;

  chkCompletado: FormControl;
  txtInput: FormControl;
  editando: boolean = false;
  @ViewChild('inputFisico')txtInputFisico: ElementRef;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkCompletado.valueChanges.subscribe(value =>{
      console.log(value);
      this.store.dispatch(toggle({id:this.todo.id}));
    });
  }

  edit(){
     this.editando = true;
     this.txtInput.setValue(this.todo.texto);
     setTimeout(() => {
       this.txtInputFisico.nativeElement.select();
     },1);
  }

  terminarEdicion(){
    this.editando=false;

    if ( this.txtInput.invalid){return};
    if ( this.txtInput.value === this.todo.texto){return;};


    this.store.dispatch(editar({
      id: this.todo.id,
      texto: this.txtInput.value
    }))
  }

  borrar(){
    this.store.dispatch(borrar({id: this.todo.id}));
  }

}
