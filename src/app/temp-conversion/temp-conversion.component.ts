import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-temp-conversion',
  templateUrl: './temp-conversion.component.html',
  styleUrls: ['./temp-conversion.component.scss'],
  standalone: false
})
export class TempConversionComponent implements OnInit {
  title: string = 'Angular Custom Pipe Example' ;
  celsius: number = 0;
  fahrenheit: number = 0;
  constructor() { }
  ngOnInit(): void {
  }
}
