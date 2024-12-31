import {TooltipDirective} from './tooltip.directive';
import {Component, DebugElement} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

@Component({
  standalone: false,
  template:
    `
      <button id="test-button" [tooltip]="'test'"></button>
    `
})
class TestTooltipDirectiveComponent {
}

describe('TooltipDirective', () => {
  let component: TestTooltipDirectiveComponent;
  let fixture: ComponentFixture<TestTooltipDirectiveComponent>;
  let des: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipDirective, TestTooltipDirectiveComponent],
      imports: [],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTooltipDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // all elements with an attached TooltipDirective
    des = fixture.debugElement.queryAll(By.directive(TooltipDirective));
  });

  it('should one tooltip element', () => {
    expect(des.length).toBe(1);
  });

  // attached TooltipDirective should be listed in the button
  it('should have `TooltipDirective` in 1st <button> providerTokens', () => {
    expect(des[0].providerTokens).toContain(TooltipDirective);
  });

  // attached TooltipDirective can be injected
  it('can inject `TooltipDirective` in 1st <button>', () => {
    const dir = des[0].injector.get(TooltipDirective);
    expect(dir).toBeTruthy();
  });

});

