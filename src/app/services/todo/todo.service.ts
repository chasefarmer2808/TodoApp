import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Todo } from './todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todos = new BehaviorSubject<Todo[]>([]);
  private baseUrl = `http://localhost:${environment.todoApiPort}/todo`;
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
    }, error => console.log('Could not create todo.'));
  }

  update(todo: Todo) {
    return this.httpClient.put<Todo>(`${this.baseUrl}`, todo).subscribe(data => {
      this.dataStore.todos.forEach((todo, index) => {
        if (todo.id === data.id) {
          this.dataStore.todos[index] = data;
        }
      });

      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not update todo.'));
  }

  delete(todoId: string) {
    let responseOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      responseType: 'text' as 'json'
    };

    return this.httpClient.delete(`${this.baseUrl}/${todoId}`, responseOptions).subscribe(response => {
      this.dataStore.todos.forEach((todo, index) => {
        if (todo.id === todoId) {
          this.dataStore.todos.splice(index, 1);
        }
      })
      this._todos.next(Object.assign([], this.dataStore).todos);
    })
  }
}
