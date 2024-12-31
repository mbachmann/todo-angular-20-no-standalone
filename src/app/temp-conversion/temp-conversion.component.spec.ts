import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TempConversionComponent} from './temp-conversion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TempConverterPipe} from "../shared/pipe/temp-converter.pipe";

describe('TempConversionComponent', () => {
  let component: TempConversionComponent;
  let fixture: ComponentFixture<TempConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TempConversionComponent, TempConverterPipe],
      imports: [ReactiveFormsModule, FormsModule],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert "32 Fahrenheit" to "0 degrees"', () => {
    // get the name's input and display elements from the DOM
    const hostElement: HTMLElement = fixture.nativeElement!;
    const nameInput: HTMLInputElement = hostElement.querySelector('#fahrenheitToCelsius')!;
    const nameDisplay: HTMLElement = hostElement.querySelector('#fahrenheitToCelsiusDisplay')!;

    // simulate user entering a new name into the input box
    nameInput.value = '32';

    // Dispatch a DOM event so that Angular learns of input value change.
    nameInput.dispatchEvent(new Event('input'));

    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();

    expect(nameDisplay.textContent).toBe('Celsius : 0.00 ');
  });

  it('should convert "0 degrees" to "32 Fahrenheit"', () => {
    // get the name's input and display elements from the DOM
    const hostElement: HTMLElement = fixture.nativeElement!;
    const nameInput: HTMLInputElement = hostElement.querySelector('#celsiusToFahrenheit')!;
    const nameDisplay: HTMLElement = hostElement.querySelector('#celsiusToFahrenheitDisplay')!;

    // simulate user entering a new name into the input box
    nameInput.value = '0';

    // Dispatch a DOM event so that Angular learns of input value change.
    nameInput.dispatchEvent(new Event('input'));

    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();

    expect(nameDisplay.textContent).toBe('Fahrenheit : 32.00 ');
  });

});
