import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { Component, DebugElement, Host } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  imports: [HighlightDirective],
  template: `
    <h2 appHighlight="yellow">Something Yellow</h2>
    <h2 appHighlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [appHighlight]="box.value" value="cyan" />
  `,
})
class HostComponent {}

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(
      () => new HighlightDirective(),
    );

    expect(directive).toBeTruthy();
  });
});

describe('HostComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let des: DebugElement[];
  let bareH2: DebugElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HostComponent);
    // await fixture.whenStable();

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });

  it('should have 3 highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('should color 1st <h2> background yellow', () => {
    expect(des[0].nativeElement.style.backgroundColor).toBe('yellow');
  });

  it('should color 2nd <h2> background should be default', () => {
    const dir = des[1].injector.get(HighlightDirective);
    fixture.detectChanges();
    expect(des[1].nativeElement.style.backgroundColor).toBe(dir.defaultColor);
  });

  it('should bind <input> background to value color', () => {
    const input = des[2].nativeElement as HTMLInputElement;

    expect(input.style.backgroundColor).toBe('cyan');

    input.value = 'green';

    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).toBe('green');
  });

  it('bare <h2> should not have a customProperty', () => {
    expect(bareH2.properties['customProperty']).toBeUndefined();
  });
});
