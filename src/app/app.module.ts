import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ApiModule, BASE_PATH} from "./openapi-gen";
import {environment} from "../environments/environment";
import { TodoItemsComponent } from './todo-items/todo-items.component';
import {TodoListsComponent} from "./todo-lists/todo-lists.component";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    TodoItemsComponent,
    TodoListsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ApiModule,
    RouterLink,
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
