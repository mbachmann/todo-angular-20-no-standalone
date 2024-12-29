import { environment } from '../../environments/environment';
import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
