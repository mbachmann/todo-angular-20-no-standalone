# Todo Angular based on angular 18.x.x no standalone

[https://github.com/mbachmann/todo-angular-19-no-standalone.git](https://github.com/mbachmann/todo-angular-19-no-standalone.git)

## Content

* [Create a new Project](#create-a-new-project)
* [Install the OpenApi Tools](#install-the-openapi-tools)
* [Generate the Model and the Backend API](#generate-the-model-and-the-backend-api)
* [Install Bootstrap](#install-bootstrap)
* [Install FontAwesome](#install-fontawesome)
* [Create a utils file](#create-a-utils-file)
* [Create an own Service](#create-an-own-service)
* [Create the TodoLists component](#create-the-todolists-component)
* [Create the TodoItems component](#create-the-todoitems-component)
* [Define the Routings](#define-the-routings)
* [Define the AppComponent](#define-the-appcomponent)
* [Add global styles](#add-global-styles)
* [Add the image todo.svg](#add-the-image-todosvg-to-the-assets-folder)
* [Create a Docker Container](#create-a-docker-container-run-and-publish-to-docker)
* [Run the App with a docker-compose.yml file](#run-the-app-with-a-docker-compose-file)
* [Create a Dockerfile](#create-a-dockerfile)
* [Create a docker-compose file](#create-a-docker-composeyml-file)


## Preview


![img.png](readme/img.png)

<br>

## Prerequisites
Both the CLI and generated project have dependencies that require Node 14.7  or higher, together with NPM 6.14.13 or higher.

The related Spring Boot Backend can be found here: [https://github.com/mbachmann/spring-boot-todo-app](https://github.com/mbachmann/spring-boot-todo-app)


## Links

* [Angular Home](https://angular.io/)
* [Angular Cli Github](https://github.com/angular/angular-cli)
* [Angular Cli Home](https://cli.angular.io/)


### Clean up old Angular cli version

```sh
    npm uninstall -g angular-cli
```
### New Installation

Global package:

```sh
    npm install -g @angular/cli@latest
```


## Create a new project

Create new project with angular-cli:

    ng new PROJECT_NAME

Go into project directory:

    cd PROJECT_NAME

Replace `PROJECT_NAME` with e.g. `todo-angular`.

* The `new` command will generate a standalone-module project. For the traditional 
aproach the --no-standalone option has to be added.
* For the stylesheet format you can use `scss`. We will use in the tutorial scss.

```sh
ng new todo-angular --routing=true
  CSS 
❯ SCSS   [ https://sass-lang.com/documentation/syntax#scss                ] 
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ] 
  Less   [ http://lesscss.org                                             ] 
  
  ? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? 
(y/N) N
```

**New project using the traditional ngModule** 

```sh
ng new todo --no-standalone --routing=true
  CSS 
❯ SCSS   [ https://sass-lang.com/documentation/syntax#scss                ] 
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ] 
  Less   [ http://lesscss.org                                             ] 
  
  ? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? 
(y/N) N
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## Install the OpenApi Tools

```sh
npm i -D  @openapitools/openapi-generator-cli
```

create the folder `src/app/openapi`.

Put the yaml file `api-docs.yaml` from  https://todo-h2.united-portal.com/v3/api-docs.yaml  in the folder `src/app/openapi`.

Add the `generate:api` command to the scripts section of `package.json`.

```json 
  "scripts": {
    ...
    ...
    "generate:api": "openapi-generator-cli generate -g typescript-angular -i  src/app/openapi/api-docs.yaml -o src/app/openapi-gen"
  },
```

Create a file _openapitools_.json and adjust the version to 5.3.0 of the generator:

```json
{
  "$schema": "node_modules/@openapitools/openapi-generator-cli/config.schema.json",
  "spaces": 2,
  "generator-cli": {
    "version": "5.3.0"
  }
}
```


## Generate the Model and the Backend API

Having one file to define your API is helpful and can save you a lot of development time and prevent possible bugs
caused by different models or API implementations in your frontend and backend code.

OpenAPI provides a good specification with helpful documentation.
Additionally, many existing backends use Swagger for their API documentation, therefore it should also be possible
to use this code generation for frontend applications where you cannot to modify the corresponding backend.

Due to the many supported languages and frameworks, it can be used in nearly every project,
and the initial setup is not very hard.


The _model_ and _api_ is generated based on the `api-docs.yaml` file in the folder `src/app/openapi-gen`. The following command creates the files.

```sh
npm run generate:api
```

The generator puts the code to the `src/app/openapi-gen` folder.

<br>

![openapi-gen.png](readme/openapi-gen.png)

<br>

**Don't forget adding the generated files to git!**


<br>

Create the environment files:

```
ng generate environments
```
src/environments
 |- environment.ts
 |- environment.development.ts
 |- environment.staging.ts (.. not generated ..)

Add the url to the backend to the files `enviroments/enviroment.ts` and `enviroment.prod.ts`.

**enviroment.ts**

```typescript
export const environment = {
  production: true,
  API_BASE_PATH: 'https://todo-h2.united-portal.com'
};
```

**enviroment.development.ts**

```typescript
export const environment = {
  production: false,
  API_BASE_PATH: 'https://todo-h2.united-portal.com'
};
```

<br>

Add the generated **ApiModule** to the `app.module.ts`. The App Module will contain also the TodoListsComponent and the TodoItemsComponent.
Please uncomment them later.

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ApiModule, BASE_PATH} from "./openapi-gen";
import {environment} from "../environments/environment";
// import {TodoItemsComponent} from './todo-items/todo-items.component';
// import {TodoListsComponent} from "./todo-lists/todo-lists.component";
// import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    // TodoListsComponent,
    // TodoItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    RouterLink
  ],
  providers: [
    {provide: BASE_PATH, useValue: environment.API_BASE_PATH},
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


```

Verify the code generation by restarting the project again.

## Install Bootstrap

We are styling the TodoApp with Bootstrap 5.x.

```sh
npm install --save @popperjs/core
npm install --save bootstrap
```


Please add below code into `angular.json` file:

```json
"styles": [
              ...
              
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.scss"
          ],
"scripts": [
              ...
              "node_modules/@popperjs/core/dist/umd/popper.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js"
           ]
```

Please add below code into `styles.scss` file:

```scss
@use 'bootstrap/scss/bootstrap';
``` 


## Install FontAwesome

```sh
npm install --save font-awesome
``` 

Please add below code into `angular.json` file:

```json
"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/font-awesome/css/font-awesome.min.css",
              "src/styles.scss"
          ], 
``` 

Please add below code into `styles.scss` file:

```scss
@use 'font-awesome/css/font-awesome.css';
$fa-font-path : '../node_modules/font-awesome/fonts';
``` 

## Create a utils file

Create a folder `src/app/shared`. In this folder create a file `utils.ts`.This file contains a data reviver function,
restoring a ISO8601 string to a Date object.

```typescript
let isoDateFormat: RegExp = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

export function parseIsoDateStrToDate(value: any) {
  if (typeof value === "string" && isoDateFormat.test(value)){
    return new Date(value);
  }
  return value
}
```

## Create an own Service

```sh
ng generate service services/todo
```

In the folder app/services add to the `todo.service.ts` file the typescript code:

```typescript
import { environment } from '../../environments/environment';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoItemListsDTO} from "../openapi-gen";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.API_BASE_PATH;
  }

  getListIDs():Observable<TodoItemListsDTO> {
    return this.http.get(this.baseUrl + "/api/v1/listids");
  }
}
```

add to the `todo.service.spec.ts` file the typescript code:

```typescript
import {TestBed} from '@angular/core/testing';

import {TodoService} from './todo.service';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TodoServiceService', () => {
  let service: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [TodoService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


```

## Create the TodoLists component

```sh
ng generate component --no-standalone TodoLists
```

Add to the `todo-lists.component.scss` file the rules:

```scss
.legend .row:nth-of-type(odd) div {
  background-color:#EEEEEE;
}

.clickable:hover {
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.19),0 0 3px 3px rgba(0,0,0,0.19);
  cursor: pointer;
}
```

Add to the `todo-lists.component.ts` file the typescript code:

```typescript
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TodoItemControllerService, TodoItemListsDTO} from "../openapi-gen";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  standalone: false
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

```

Add to the `todo-lists.component.html` file the template code:

```html
<h4 class="component-title">Todo Lists</h4>
<p class="sub-para todo-info">Example angular application with Spring Boot Backend and OpenApi generated REST API</p>
<p class="sub-para todo-listinfo">Todo Lists: {{todoLists.count}}</p>

<section class="container legend"  >
  <div class="row " *ngFor="let listId of todoLists.todoItemList; let i = index">
    <div [routerLink]="['/todoitem/',listId ]" class="col-sm-8 py-1 my-1 clickable">List {{i+1}} : {{listId}}</div>
  </div>
</section>
```

Add to the `todo-lists.component.spec.ts` file the typescript code:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsComponent } from './todo-lists.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TodoListsComponent', () => {
  let component: TodoListsComponent;
  let fixture: ComponentFixture<TodoListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListsComponent],
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


```

## Create the TodoItems component

```sh
ng generate component --no-standalone TodoItems
```

Add to the `todo-items.component.scss` file the rules:

```scss
.legend .row:nth-of-type(odd) div {
  background-color:#EEEEEE;
}

.clickable:hover {
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.19),0 0 3px 3px rgba(0,0,0,0.19);
  cursor: pointer;
}


.cmd-buttons {
  padding-left: 5px;
  padding-right: 5px;
  float: right;
}
.cmd-buttons:hover {
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.19), 0 0 1px 1px rgba(0, 0, 0, 0.19);
}

.form-control {
  font-size: 16px;
  padding-left: 15px;
  outline: none;
  border: 1px solid #E8E8E8;
}

```

Add to the `todo-items.component.ts` file the typescript code:

```typescript
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {TodoItem, TodoItemControllerService} from "../openapi-gen";
import {ActivatedRoute, Router} from "@angular/router";
import {parseIsoDateStrToDate} from "../shared/utils";

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss'],
  standalone: false
})
export class TodoItemsComponent implements OnInit {

  @ViewChild('taskNameTextField', {static: true}) taskNameTextField: ElementRef | undefined;
  private routeSubscription: Subscription | undefined;
  private subscription: Subscription | undefined;
  private listId: string = "";
  todoItems: Array<TodoItem> = [];
  private editIndex: number = -1;

  constructor(private readonly todoItemControllerService: TodoItemControllerService,
              private route: ActivatedRoute,
              private router: Router,
  ) {

  }

  ngOnDestroy(): void {

    if (this.routeSubscription != undefined) {
      this.routeSubscription.unsubscribe();
    }
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.listId = params['id'];
      console.log(this.listId);
      this.refreshList(this.listId);
    });


  }

  getListId(id: number): string | undefined {
    if (this.todoItems.length > 0) {
      return this.todoItems[id].listId;
    }
    return "";
  }

  onDelete(itemId: number | undefined) {
    if (itemId !== undefined) {
      this.todoItemControllerService.deleteTodoItem(itemId).subscribe(
        data => {
          this.refreshList(this.listId);
        },
        err => console.log(err)
      );
    }
  }

  onEdit(index: number) {
    if (this.taskNameTextField !== undefined) {
      this.taskNameTextField.nativeElement.value = this.todoItems[index].taskName;
      this.editIndex = index;
    }
  }

  onDone(itemId: number | undefined) {
    if (itemId !== undefined) {
      this.todoItemControllerService.changeDoneState(itemId).subscribe(
        data => {
          this.refreshList(this.listId);
        },
        err => console.log(err)
      );
    }
  }

  refreshList(listId: string) {
    this.subscription = this.todoItemControllerService.getItem(listId).subscribe(
      data => {
        this.todoItems = data;
        // @ts-ignore
        this.todoItems.forEach(item => item.createdAt = parseIsoDateStrToDate(item.createdAt));
        if (this.taskNameTextField !== undefined) {
          this.taskNameTextField.nativeElement.focus();
          this.taskNameTextField.nativeElement.select();
        }
      },
      err => console.log(err)
    );
  }

  onEnterKeyDown() {
    if (this.taskNameTextField !== undefined) {
      let taskName: string = this.taskNameTextField.nativeElement.value;
      if (taskName.length > 0) {
        if (this.editIndex > 0) {
          this.todoItems[this.editIndex].taskName = taskName;
          this.todoItemControllerService.editTodoItem(this.todoItems[this.editIndex]).subscribe(
            data => {
              this.refreshList(this.listId);
            },
            err => console.log(err)
          );

          this.editIndex = -1;
        } else {
          let todoItem: TodoItem = {
            taskName: taskName,
            listId: this.listId,
            done: false
          }
          this.todoItemControllerService.newTodoItem(todoItem).subscribe(
            data => {
              this.refreshList(this.listId);
            },
            err => console.log(err)
          );
        }
        this.taskNameTextField.nativeElement.value = "";
      }
    }
  }
}

```

Add to the `todo-items.component.html` file the template code:

```html
<h4 class="component-title">Todo Items</h4>

<p class="sub-para todo-info">Todo List &nbsp;&nbsp; : {{getListId(0)}}</p>
<p class="sub-para todo-listinfo">Todo Items : {{todoItems.length}} Items</p>

<div class="container" style="padding-left: 0;">
  <div class="row">
    <div class="col-sm-9 my-3 pe-0">
    <input type="text" id="taskNameTextField"  #taskNameTextField class="form-control" (keydown.enter)="onEnterKeyDown()"
           placeholder="Input task name then tap Enter to add">
    </div>
  </div>
</div>
<section class="container legend">
  <div class="row " *ngFor="let todoItem of todoItems; let i = index">
    <div class="col-sm-9 py-1 my-1 clickable">
      <input [checked]="todoItem.done" (click)=onDone(todoItem.itemId) class="form-check-input" type="checkbox"/>
      &nbsp;<span [ngStyle]="{'text-decoration': (todoItem.done) ? 'line-through' : 'none'}"> {{todoItem.taskName}}</span>
      <span (click)=onDelete(todoItem.itemId) class="cmd-buttons"><i class="fa fa-trash"></i></span>
      <span (click)=onEdit(i) class="cmd-buttons"><i class="fa fa-edit"></i></span>
    </div>
  </div>
</section>
```

Add to the `todo-items.component.spec.ts` file the typescript code:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemsComponent } from './todo-items.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TodoItemsComponent', () => {
  let component: TodoItemsComponent;
  let fixture: ComponentFixture<TodoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemsComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 2,
            }),
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

## Define the Routings

The file app-routing.modules.ts contains the mappings from routes to components. 

```typescript
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

```

## Define the AppComponent

Add to the `app.component.scss` file the rules:

```scss

.app {
  background-color:#FFF;
  min-height: 100vh;
}

@media (max-width: 767px) {
  .navbar-collapse {
    margin-top: 10px;
  }
}

.nav-link:hover {
  background-color:#DDD;
}

.navbar {
  -webkit-box-shadow: 0 8px 6px -6px #999;
  -moz-box-shadow: 0 8px 6px -6px #999;
  box-shadow: 0 8px 6px -6px #999;
  background-color:#f8f8f8;
}

.navbar-brand {
  cursor: pointer;
  width: 140px;
}

main {
  padding-top: 70px;
  padding-bottom: 70px;
}



```

Add to the `app.component.ts` file the typescript code:

```typescript

import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'todo-angular';

    ngOnInit(): void {
    }

    ngOnDestroy(){
    }

}

```

Add to the `app.component.html` file the template code:

```html
<div class="container px-0 app">

  <nav class="fixed-top navbar navbar-light navbar-expand-md bg-faded px-2">
    <div [routerLink]="['/home']" class="navbar-brand"><img alt="todo-logo" src="assets/todo.svg" width="50px"> Todo App
    </div>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" [routerLink]="['/home']">Start Page</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/mbachmann/spring-boot-todo-app" target="_blank">Github
            Backend</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/mbachmann/todo-angular-19-no-standalone" target="_blank">Github Frontend</a>
        </li>
      </ul>
    </div>
  </nav>

  <main class="px-3 mt-4 main">
    <router-outlet></router-outlet>
  </main>

  <footer class="fixed-bottom px-3 mt-4 bg-light">
    <section class="container d-flex justify-content-center justify-content-lg-between p-4 border-bottom" >

      <!-- Left -->
      <div class="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>
      <!-- Left -->

      <!-- Right -->
      <div>
        <a href="https://www.youtube.com/channel/UCGLcphLMTcUNZRIRGUVu8rg" target="_blank" class="me-4 text-reset">
          <i class="fa fa-youtube-play"></i>
        </a>
        <a href="https://twitter.com/mbachmann4" target="_blank" class="me-4 text-reset">
          <i class="fa fa-twitter"></i>
        </a>
        <a href="https://www.linkedin.com/in/matthias-bachmann-b3809541/" target="_blank"  class="me-4 text-reset">
          <i class="fa fa-linkedin"></i>
        </a>
        <a href="https://github.com/mbachmann" target="_blank" class="me-4 text-reset">
          <i class="fa fa-github"></i>
        </a>
      </div>
      <!-- Right -->
    </section>
    <!-- Section: Social media -->
  </footer>
</div>

```
Add to the `app.component.spec.ts` file the typescript code:

```typescript
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('todo-angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Todo App');
  });
});
```

## Add global styles

Please replace the code below with the content of the  `styles.scss` file:

```scss
/* You can add global styles to this file, and also import other style files */
@import 'bootstrap/scss/bootstrap';
@import 'font-awesome/css/font-awesome.css';
$fa-font-path : '../node_modules/font-awesome/fonts';

body {
  font-size: 18px;
  line-height: 1.58;
  background: #6699FF;
  background: -webkit-linear-gradient(to left, #336699, #228899);
  background: linear-gradient(to left, #336699, #228899);
  color: #333;
  padding-bottom: 70px;
  padding-top: 40px;
}

.component-title {
  color: #228899;
}

.sub-para {
  font-size: small;
}

.todo-info {
  margin-bottom: 6px;
}

.todo-listinfo {
  margin-bottom: 30px;
}

```

## Add the image todo.svg to the assets folder

Copy the content to the file `todo.svg`.

```svg
<?xml version="1.0" ?>
<svg id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" xml:space="preserve"
     xmlns="http://www.w3.org/2000/svg"><style type="text/css">
	.st0 {
    opacity: 0.2;
    fill: #FFFFFF;
  }

  .st1 {
    fill: #FFFFFF;
  }

  .st2 {
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st3 {
    fill: #5E61A3;
  }

  .st4 {
    opacity: 0.5;
    fill: #242C88;
  }

  .st5 {
    fill: #39C89A;
  }

  .st6 {
    fill: #CAEAFB;
  }

  .st7 {
    fill: #589FFF;
  }

  .st8 {
    fill: #FF5751;
  }

  .st9 {
    fill: #BC8D66;
  }

  .st10 {
    opacity: 0.7;
    fill: #FFFFFF;
  }

  .st11 {
    fill: #F1C92A;
  }

  .st12 {
    opacity: 0.4;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st13 {
    fill: #F3877E;
  }

  .st14 {
    fill: #83D689;
  }

  .st15 {
    opacity: 0.4;
    fill: #242C88;
  }

  .st16 {
    opacity: 0.2;
    fill: #242C88;
  }

  .st17 {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0.1, 6;
  }

  .st18 {
    fill: #FFC408;
  }

  .st19 {
    opacity: 0.4;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0.1, 6;
  }

  .st20 {
    fill: none;
    stroke: #CAEAFB;
    stroke-width: 12;
    stroke-linecap: round;
    stroke-miterlimit: 10;
  }

  .st21 {
    fill: none;
    stroke: #CAEAFB;
    stroke-width: 7;
    stroke-linecap: round;
    stroke-miterlimit: 10;
  }

  .st22 {
    opacity: 0.4;
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st23 {
    opacity: 0.5;
  }

  .st24 {
    fill: #242C88;
  }

  .st25 {
    fill: none;
    stroke: #242C88;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0.1, 6;
  }

  .st26 {
    opacity: 0.5;
    fill: #FFFFFF;
  }

  .st27 {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st28 {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st29 {
    fill: #E5BD9E;
  }

  .st30 {
    fill: #A06D47;
  }

  .st31 {
    opacity: 0.3;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0.1, 6;
  }

  .st32 {
    opacity: 0.1;
    fill: #242C88;
  }

  .st33 {
    opacity: 0.5;
    fill: #FF5751;
  }

  .st34 {
    opacity: 0.2;
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st35 {
    opacity: 0.3;
    clip-path: url(#SVGID_2_);
  }

  .st36 {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0, 6;
  }

  .st37 {
    opacity: 0.3;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0, 6;
  }

  .st38 {
    clip-path: url(#SVGID_4_);
  }

  .st39 {
    opacity: 0.2;
    fill: none;
    stroke: #242C88;
    stroke-width: 9;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st40 {
    opacity: 0.3;
  }

  .st41 {
    opacity: 0.4;
    fill: #FFFFFF;
  }

  .st42 {
    opacity: 0.5;
    fill: #CAEAFB;
  }

  .st43 {
    opacity: 0.6;
    fill: #242C88;
  }

  .st44 {
    opacity: 0.5;
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st45 {
    opacity: 0.3;
    fill: #242C88;
  }

  .st46 {
    opacity: 0.2;
  }

  .st47 {
    clip-path: url(#SVGID_6_);
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st48 {
    opacity: 0.2;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st49 {
    clip-path: url(#SVGID_8_);
    fill: #FFFFFF;
  }

  .st50 {
    clip-path: url(#SVGID_8_);
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st51 {
    opacity: 0.2;
    clip-path: url(#SVGID_8_);
    fill: #242C88;
  }

  .st52 {
    opacity: 0.2;
    clip-path: url(#SVGID_8_);
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st53 {
    fill: none;
    stroke: #242C88;
    stroke-width: 1.848;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st54 {
    opacity: 0.4;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 7;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st55 {
    opacity: 0.2;
    fill: none;
    stroke: #242C88;
    stroke-width: 7;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st56 {
    opacity: 7.000000e-02;
    fill: #242C88;
  }

  .st57 {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st58 {
    opacity: 0.4;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st59 {
    opacity: 0.2;
    fill: none;
    stroke: #242C88;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st60 {
    fill: none;
    stroke: #FF5751;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st61 {
    fill: none;
    stroke: #242C88;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }
</style>
  <rect class="st1" height="83" width="68" x="11" y="17"/>
  <rect class="st2" height="83" width="68" x="11" y="17"/>
  <path class="st14" d="M33,46H23c-1.1,0-2-0.9-2-2V34c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C35,45.1,34.1,46,33,46z"/>
  <path class="st14" d="M32.8,66H23c-1.1,0-2-0.9-2-2V54c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v9.8C35,65,34,66,32.8,66z"/>
  <path class="st14" d="M33,87H23c-1.1,0-2-0.9-2-2V75c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C35,86.1,34.1,87,33,87z"/>
  <path class="st2" d="M33,46H23c-1.1,0-2-0.9-2-2V34c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C35,45.1,34.1,46,33,46z"/>
  <path class="st2" d="M32.8,66H23c-1.1,0-2-0.9-2-2V54c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v9.8C35,65,34,66,32.8,66z"/>
  <path class="st2" d="M33,87H23c-1.1,0-2-0.9-2-2V75c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C35,86.1,34.1,87,33,87z"/>
  <path class="st16" d="M79,101V24H28c-1.1,0-2,0.9-2,2v75H79z"/>
  <rect class="st1" height="83" width="68" x="31" y="29"/>
  <rect class="st2" height="83" width="68" x="31" y="29"/>
  <line class="st34" x1="63" x2="75" y1="53" y2="53"/>
  <line class="st34" x1="63" x2="87" y1="48" y2="48"/>
  <path class="st14" d="M54,58H44c-1.1,0-2-0.9-2-2V46c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C56,57.1,55.1,58,54,58z"/>
  <polyline class="st2" points="45.3,51.7 48.2,54.4 53.9,48.6 "/>
  <line class="st34" x1="63" x2="75" y1="74" y2="74"/>
  <line class="st34" x1="63" x2="87" y1="68" y2="68"/>
  <path class="st14"
        d="M54,78H44c-1.1,0-2-0.9-2-2V66c0-1.1,0.9-2,2-2h9.8c1.2,0,2.2,1,2.2,2.2V76C56,77.1,55.1,78,54,78z"/>
  <polyline class="st2" points="45.3,71.9 48.2,74.6 53.9,68.9 "/>
  <line class="st34" x1="63" x2="75" y1="94" y2="94"/>
  <line class="st34" x1="63" x2="87" y1="89" y2="89"/>
  <path class="st14" d="M54,98H44c-1.1,0-2-0.9-2-2V86c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C56,97.1,55.1,98,54,98z"/>
  <path class="st2" d="M54,58H44c-1.1,0-2-0.9-2-2V46c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C56,57.1,55.1,58,54,58z"/>
  <path class="st2"
        d="M54,78H44c-1.1,0-2-0.9-2-2V66c0-1.1,0.9-2,2-2h9.8c1.2,0,2.2,1,2.2,2.2V76C56,77.1,55.1,78,54,78z"/>
  <path class="st2" d="M54,98H44c-1.1,0-2-0.9-2-2V86c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C56,97.1,55.1,98,54,98z"/>
  <polygon class="st16" points="99,57.6 65.2,77.5 53.6,94.9 74.4,93.1 99,78.6 "/>
  <g><polygon class="st1" points="111.4,50.1 73.8,87.7 54.1,94.6 61,74.9 98.6,37.3  "/>
    <rect class="st18" height="18.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -18.9596 79.2808)" width="53.2"
          x="59.6" y="53.5"/>
    <rect class="st16" height="5.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -20.8293 83.7946)" width="53.2"
          x="64.1" y="64.4"/>
    <polygon class="st3" points="57.1,86 54.1,94.4 62.5,91.4  "/>
    <polygon class="st2" points="111.4,50.1 73.8,87.7 54.1,94.6 61,74.9 98.6,37.3  "/>
    <path class="st13" d="M111.4,50.1l6-6c1.7-1.7,1.7-4.4,0-6l-6.8-6.8c-1.7-1.7-4.4-1.7-6,0l-6,6L111.4,50.1z"/>
    <path class="st2" d="M111.4,50.1l6-6c1.7-1.7,1.7-4.4,0-6l-6.8-6.8c-1.7-1.7-4.4-1.7-6,0l-6,6L111.4,50.1z"/>
    <line class="st2" x1="80.6" x2="106.9" y1="73.4" y2="47.1"/>
    <line class="st2" x1="70" x2="76.1" y1="84" y2="77.9"/>
    <rect class="st1" height="18.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.5282 86.9153)" width="7.4"
          x="100.9" y="35.1"/>
    <rect class="st16" height="18.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.5282 86.9153)" width="7.4"
          x="100.9" y="35.1"/>
    <rect class="st2" height="18.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.5282 86.9153)" width="7.4"
          x="100.9" y="35.1"/></g></svg>
```


###  Create a Docker Container, Run and Publish to Docker

Create a distribution of the todo-angular app with 

```
ng build
```

<br/>

**For intel architecture:**

```
$  docker build --platform linux/amd64 -t uportal/todo-angular .

$  docker run --platform linux/amd64 -p 4000:4000 --rm -it  uportal/todo-angular
```

**ATTENTION**: DO NOT MISS THE POINT AT THE END OF THE docker build COMMAND.

<br/>

**For arm64v8 architecture (e.g. MAC Mx):** [https://hub.docker.com/r/arm64v8/nginx/](https://hub.docker.com/r/arm64v8/nginx/)

```
$  docker build -f Dockerfile.arm --platform linux/arm64v8 -t uportal/todo-angular .

$  docker run --platform linux/arm64v8 -p 4000:80 --rm -it  uportal/todo-angular
```

**ATTENTION**: DO NOT MISS THE POINT AT THE END OF THE docker build COMMAND.

<br/>

_Ctrl c_ will stop and delete the container.

<br/>

Replace **uportal** with your **dockerhub id**.

<br/>

```
$  docker login
$  docker login --username uportal --password 
$  docker push uportal/todo-app
```
<br/>


Alternative way for login:

```
cat ~/.key/my_password.txt | docker login --username uportal --password-stdin
```

Login to deployment platform with a container infrastructure:

<br/>

Replace **uportal** with your **dockerhub id**.

<br/>

```
$  docker pull uportal/todo-app
```

<br/>

###  Run the app with a docker-compose file

Start the App in detached mode with:

```
$  docker compose up -d
```


<br/>

Start the App with log output in the console:

```
$  docker compose up
```


or with specific docker-compose file (e.g. on linux with a traefik reverse proxy)

```
$  docker compose -f docker-compose-traefik.yml up
```

<br/>

Delete containers:

```
$  docker compose rm
```

<br/>

### Create a Dockerfile

The Dockerfile takes a nginx image_, adds the content of dist/todo-angular/browser and puts it into the /usr/share/nginx/html folder.

Create a folder _nginx_ and in this folder a file _default.conf_ for the configuration of the nginx web server:

```nginx configuration

server {

  listen 80;

  sendfile on;

  default_type application/octet-stream;

  gzip on;
  gzip_http_version 1.1;
  gzip_disable      "MSIE [1-6]\.";
  gzip_min_length   1100;
  gzip_vary         on;
  gzip_proxied      expired no-cache no-store private auth;
  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  gzip_comp_level   9;


  root /usr/share/nginx/html;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";

  location / {
    try_files $uri $uri/ /index.html =404;
 }
}

```

<br/>

**Option 1: For intel based architecture Dockerfile**

```dockerfile
FROM nginx:1.13.3

VOLUME /var/cache/nginx

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/


RUN rm -rf /usr/share/nginx/html/*

COPY  dist/todo-angular/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

```

**Option 2: For arm64v8 based architecture Dockerfile.arm**

```dockerfile

FROM arm64v8/nginx:1.25.3

VOLUME /var/cache/nginx

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/


RUN rm -rf /usr/share/nginx/html/*

COPY  dist/todo-angular/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

```

<br/>

### Create a docker-compose.yml file

Replace **uportal** with your **dockerhub id**.

<br/>

```yaml
version: '3'

services:
  todo-angular:
    image: uportal/todo-angular:latest

    restart: always
    ports:
      - 4000:80



```

<br/>

### Create a docker-compose-traefik.yml file


Traefik is a reverse proxy on linux. There is a version 1.x and 2.x for the yaml-file possible, depending on the use of the traefik version.

[https://doc.traefik.io/traefik/](https://doc.traefik.io/traefik/)

**For traefik version 1.x**

```yaml
version: '2'


networks:
  proxy:
    external: true

services:

  todo-angular:
    image: uportal/todo-angular:latest
    labels:
      - "traefik.backend=todo-angular"
      - "traefik.frontend.rule=Host:todo-angular.united-portal.com"
      - "traefik.docker.network=proxy"
      - "traefik.port=80"
      - "traefik.enable=true"

    restart: always
    ports:
      - 4000:80
    networks:
      - proxy
```

**For traefik version 2.x**

```yaml
version: '2'


networks:
  proxy:
    external: true

services:

  todo-angular:
    image: uportal/todo-angular:latest
    labels:
      - traefik.http.routers.blog.rule=Host(`todo-angular.united-portal.com`)
      - traefik.http.routers.blog.tls=true
      - traefik.http.routers.blog.tls.certresolver=lets-encrypt
      - traefik.port=8080
    restart: always
    ports:
      - 4000:80
    networks:
      - proxy


```
