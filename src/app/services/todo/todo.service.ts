import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('http://localhost:3000/todo');
  }
}
