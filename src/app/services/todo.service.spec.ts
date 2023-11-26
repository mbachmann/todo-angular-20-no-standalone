import {TestBed} from '@angular/core/testing';

import {TodoService} from './todo.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TodoServiceService', () => {
  let service: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    })
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
