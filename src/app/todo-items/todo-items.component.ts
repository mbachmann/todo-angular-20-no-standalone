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
