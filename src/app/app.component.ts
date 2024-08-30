import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { publicDecrypt } from 'crypto';
import { json } from 'stream/consumers';
import { title } from 'process';
import { Todo, TodoService } from './todo.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  newTodoTitle: string = '';

  constructor(private todoService: TodoService) {}
  todos: Todo[] = [];
  itemCount: number = this.todos.filter(item => item.isCompleted == false).length;

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(isCompleted?: boolean): void{
    this.todoService.getTodos().subscribe((data: Todo[]) => {
      this.todos = data;
      if(isCompleted != undefined){
        this.todos = this.todos.filter(item => item.isCompleted == isCompleted)
      }
      this.itemCount = this.todos.filter(item => item.isCompleted == false).length;
    });
  }

  setToggle(id: string): void{
    const item =this.todos.filter(x => x.id ==id)[0];
    item.isCompleted = !item.isCompleted;
    this.todoService.setToggleService(item).subscribe(
      response => console.log("setToggle")
    )
  }

  deleteTodo(id: string): void{
    this.todoService.deleteService(id).subscribe(
      response => console.log(response)
    )
    this.getTodos();
  }

  setTodos(): void{
    if(this.newTodoTitle)
    {
      this.todoService.setTodos({title:this.newTodoTitle}).subscribe(
        response => 
        {console.log("Başarıyla eklendi", response)
        this.todos.push(response)
        this.itemCount = this.todos.length
        
        this.newTodoTitle = ""
        }
      );
    }
  }
}