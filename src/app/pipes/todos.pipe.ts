import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from '../services/todo/todo';

@Pipe({ 
    name: 'todos',
    pure: false
})
export class TodosPipe implements PipeTransform {
    transform(todos: Todo[], getDoneTodos: boolean = true): Todo[] {
        if (todos != null) {
            if (getDoneTodos) {
                return todos.filter(todo => todo.isDone);
            }
            return todos.filter(todo => !todo.isDone)
        }
    }
}