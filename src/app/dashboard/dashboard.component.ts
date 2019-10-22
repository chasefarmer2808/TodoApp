import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/services/todo/todo.service';
import { Todo } from 'src/app/services/todo/todo';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todos$: Observable<Todo[]>;

  todoForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private todoService: TodoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.todos$ = this.todoService.todos;
    this.todoService.loadAll();
  }

  addTodo(todoName: string) {
    this.todoService.create(new Todo(todoName));
    this.todoForm.reset();
  }

  toggleTodo(todo: Todo, checkEvent: MatCheckboxChange) {
    todo.isDone = checkEvent.checked;
    this.todoService.update(todo);
  }

  deleteTodo(todoId: string) {
    this.todoService.delete(todoId);
  }

}
