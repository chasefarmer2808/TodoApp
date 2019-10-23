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
  oldTodoName: string;
  editIndex: number;

  todoForm = this.fb.group({
    name: ['', Validators.required]
  });

  updateTodoForm = this.fb.group({
    name: ['']
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

  updateTodoName(todo: Todo) {
    this.todoService.update(todo);
    this.oldTodoName = todo.name;
  }

  editingTodo(todo: Todo, currIndex: number): boolean {
    return this.oldTodoName != todo.name && currIndex == this.editIndex;
  }

}
