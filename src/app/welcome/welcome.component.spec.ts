import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { By } from '@angular/platform-browser';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("title should be Welcome", () => {
    expect(component.title).toBe("Welcome!");
  })

  it("title should be updated", () => {
    component.title = "Angular Testing";
    fixture.detectChanges();

    expect(component.title).toBe("Angular Testing");

    const element = fixture.debugElement.query(By.css('h1'));
    expect(element.nativeElement.textContent).toContain('Angular Testing');
  })

  it("Learn detectChanges()", () => {
    component.title = 'First';
    fixture.detectChanges(); // DOM becomes 'First'

    const firstElement = fixture.debugElement.query(By.css('h1'));
    expect(firstElement.nativeElement.textContent).toContain('First');

    component.title = 'Second';

    const secondElement = fixture.debugElement.query(By.css('h1'));
    expect(secondElement.nativeElement.textContent).toContain('First');
    expect(secondElement.nativeElement.textContent).not.toContain('Second');

    fixture.detectChanges(); // DOM now becomes 'Second'

    // Now your assertion will pass:
    const testElement = fixture.debugElement.query(By.css('h1'));
    expect(testElement.nativeElement.textContent).toContain('Second');
  })

  it("should show count as 1", () => {
    component.increment();

    fixture.detectChanges();

    expect(component.count).toBe(1);

    const count = fixture.debugElement.query(By.css('p'));
    expect(count.nativeElement.textContent.trim()).toBe('1');
  })
});
