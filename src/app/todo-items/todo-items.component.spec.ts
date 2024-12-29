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
