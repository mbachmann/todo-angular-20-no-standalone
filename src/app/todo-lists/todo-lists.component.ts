import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TodoItemControllerService, TodoItemListsDTO} from "../openapi-gen";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent implements OnInit, OnDestroy  {

  private subscription: Subscription | undefined;
  todoLists: TodoItemListsDTO = {};

  constructor(private readonly todoItemControllerService: TodoItemControllerService,
              private readonly  todoService: TodoService) {}

  ngOnDestroy(): void {

    if (this.subscription != undefined)  {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.useOwnService();
    // this.useOpenApiService();
  }

  useOwnService(): void {
    this.subscription = this.todoService.getListIDs().subscribe({
      next: (data) => this.todoLists = data,
      error:(err) =>  console.log(err)
    });
  }

  useOpenApiService(): void {
    this.subscription = this.todoItemControllerService.getListIDs().subscribe({
      next: (data) => this.todoLists = data,
      error:(err) =>  console.log(err)
    });
  }

}
