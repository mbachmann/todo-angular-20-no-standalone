import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ApiModule, BASE_PATH} from "./openapi-gen";
import {environment} from "../environments/environment";
import {TodoItemsComponent} from './todo-items/todo-items.component';
import {TodoListsComponent} from "./todo-lists/todo-lists.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {TempConversionComponent} from "./temp-conversion/temp-conversion.component";
import {TooltipDirective} from "./shared/directive/tooltip.directive";
import {TempConverterPipe} from "./shared/pipe/temp-converter.pipe";
import {MyFirstComponent} from "./my-first/my-first.component";

@NgModule({
  declarations: [
    AppComponent,
    MyFirstComponent,
    TodoItemsComponent,
    TodoListsComponent,
    LoginComponent,
    SignupComponent,
    TooltipDirective,
    TempConverterPipe,
    TempConversionComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: BASE_PATH, useValue: environment.API_BASE_PATH},
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {
}
