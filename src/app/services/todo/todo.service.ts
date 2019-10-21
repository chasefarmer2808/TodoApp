import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todos = new BehaviorSubject<Todo[]>([]);
  private baseUrl = 'http://localhost:3000/todo';
  private dataStore: { todos: Todo[] } = { todos: [] };
  readonly todos = this._todos.asObservable();

  constructor(private httpClient: HttpClient) { }

  loadAll() {
    this.httpClient.get<Todo[]>(`${this.baseUrl}`).subscribe(data => {
      this.dataStore.todos = data;
      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not load todos.'));
  }

  create(todo: Todo) {
    this.httpClient.post<Todo>(`${this.baseUrl}`, todo).subscribe(data => {
      this.dataStore.todos.push(data);
      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not create todo.'));
  }

  update(todo: Todo) {
    console.log(todo)
    return this.httpClient.put<Todo>(`${this.baseUrl}`, todo).subscribe(data => {
      this.dataStore.todos.forEach((todo, index) => {
        if (todo.id === data.id) {
          this.dataStore.todos[index] = data;
        }
      });

      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not update todo.'));
  }
}
