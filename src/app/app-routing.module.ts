import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListsComponent} from "./todo-lists/todo-lists.component";
import {TodoItemsComponent} from "./todo-items/todo-items.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {TempConversionComponent} from "./temp-conversion/temp-conversion.component";
import {MyFirstComponent} from "./my-first/my-first.component";

export const routes: Routes = [
  {
    path: 'myfirst',
    component: MyFirstComponent
  },
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
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'temp',
    component: TempConversionComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
