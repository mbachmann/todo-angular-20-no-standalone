
import {RouterLink, RouterOutlet} from '@angular/router';

import {Component, OnDestroy, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'todo-angular';

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

}
