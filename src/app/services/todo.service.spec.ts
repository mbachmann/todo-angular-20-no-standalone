import {TestBed} from '@angular/core/testing';

import {TodoService} from './todo.service';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

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
