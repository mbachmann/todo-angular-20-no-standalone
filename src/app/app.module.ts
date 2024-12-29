import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ApiModule, BASE_PATH} from "./openapi-gen";
import {environment} from "../environments/environment";
import {TodoItemsComponent} from './todo-items/todo-items.component';
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
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ApiModule,
    RouterLink
  ],
  providers: [
    {provide: BASE_PATH, useValue: environment.API_BASE_PATH},
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {
}
