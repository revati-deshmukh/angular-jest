import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'cart' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cart');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, cart');
  });

  // describe('Counter component tests in parent component', () => {
  //   it('should receive the event from the child', () => {
  //     const fixture = TestBed.createComponent(AppComponent);
  //     const component = fixture.componentInstance;
  //     component.onChanged(5);

  //     expect(component.parentValue).toBe(5);
  //   });

  //   it('should receive the changed event from the child', () => {
  //     const fixture = TestBed.createComponent(AppComponent);
  //     const component = fixture.componentInstance;
  //     const counterDebugElement = fixture.debugElement.query(
  //       (el) => el.componentInstance instanceof CounterComponent,
  //     );

  //     const counterComponent =
  //       counterDebugElement.componentInstance as CounterComponent;

  //     counterComponent.changed.emit(5);

  //     fixture.detectChanges();

  //     expect(component.parentValue).toBe(5);
  //   });

  //   it('should update the parent value when the child emits', () => {
  //     const fixture = TestBed.createComponent(AppComponent);
  //     const component = fixture.componentInstance;

  //     const counterDebugElement = fixture.debugElement.query(
  //       (el) => el.componentInstance instanceof CounterComponent,
  //     );

  //     const counterComponent =
  //       counterDebugElement.componentInstance as CounterComponent;

  //     counterComponent.changed.emit(10);

  //     expect(component.parentValue).toBe(10);
  //   });

  //   it('should update the UI when the child emits', () => {
  //     const fixture = TestBed.createComponent(AppComponent);

  //     const counterDebugElement = fixture.debugElement.query(
  //       (el) => el.componentInstance instanceof CounterComponent,
  //     );

  //     const counterComponent =
  //       counterDebugElement.componentInstance as CounterComponent;

  //     counterComponent.changed.emit(7);

  //     fixture.detectChanges();

  //     const paragraph = fixture.nativeElement.querySelector('h4');

  //     expect(paragraph.textContent).toContain('7');
  //   });

  //   it('should update the parent and UI when the child button is clicked', () => {
  //     const fixture = TestBed.createComponent(AppComponent);
  //     const component = fixture.componentInstance;

  //     const button = fixture.nativeElement.querySelector('button');

  //     button.click();
  //     fixture.detectChanges();

  //     expect(component.parentValue).toBe(1);

  //     const paragraph = fixture.nativeElement.querySelector('h4');

  //     expect(paragraph.textContent).toContain('1');
  //   });

  //   it('should update the parent each time the child changes', () => {
  //     const fixture = TestBed.createComponent(AppComponent);
  //     const component = fixture.componentInstance;

  //     const button = fixture.nativeElement.querySelector('button');

  //     button.click();
  //     fixture.detectChanges();

  //     expect(component.parentValue).toBe(1);

  //     button.click();
  //     fixture.detectChanges();

  //     expect(component.parentValue).toBe(2);

  //     button.click();
  //     fixture.detectChanges();

  //     expect(component.parentValue).toBe(3);
  //   });
  // });
});
