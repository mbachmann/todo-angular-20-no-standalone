import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListsComponent} from "./todo-lists/todo-lists.component";
import {TodoItemsComponent} from "./todo-items/todo-items.component";

export const routes: Routes = [
  {
    path: 'home',
    component: TodoListsComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'todoitem/:id',
    component: TodoItemsComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
