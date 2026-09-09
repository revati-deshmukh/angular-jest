import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComponent } from './demo.component';
import { By } from '@angular/platform-browser';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should start with loaded as false before ngOnInit runs", () => {
    expect(component.loaded).toBe(false);
    
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeNull();
  })

   it('should set loaded to true and render template after ngOnInit runs', () => {
    fixture.detectChanges();

   expect(component.loaded).toBe(true);

    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent.trim()).toBe('demo works!');
  });
});
