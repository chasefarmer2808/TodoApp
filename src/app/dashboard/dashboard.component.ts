import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(data => {
      console.log(data);
    });
  }

}
