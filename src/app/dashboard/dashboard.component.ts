import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/services/todo/todo.service';
import { Todo } from 'src/app/services/todo/todo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos$ = this.todoService.todos;
    this.todoService.loadAll();
  }

  toggleTodo(todo: Todo, checkEvent: Event, index: Number) {
    console.log(index)
    // todo.isDone = !todo.isDone
    // this.todoService.update(todo);
  }

}
