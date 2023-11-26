import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsComponent } from './todo-lists.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TodoListsComponent', () => {
  let component: TodoListsComponent;
  let fixture: ComponentFixture<TodoListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ TodoListsComponent ]
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
