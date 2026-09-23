import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CardComponent],
  template: `
    <app-card>
      <h2>My Card</h2>
      <p>Hello World</p>
      <button>Click Me</button>
    </app-card>
  `
})
class TestHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    });

    fixture = TestBed.createComponent(TestHostComponent);

    fixture.detectChanges();
  });

  it('should project content into the card', () => {
    const card = fixture.nativeElement.querySelector('.card');
    const paragraph = card.querySelector('p');

    expect(paragraph).not.toBeNull();
    expect(paragraph.textContent).toContain('Hello World');
  });

  it('should project multiple elements', () => {
    const card = fixture.nativeElement.querySelector('.card');

    const elements = card.querySelectorAll('h2, p, button');

    expect(elements).toHaveLength(3);

    expect(elements[0].textContent).toContain('My Card');
    expect(elements[1].textContent).toContain('Hello World');
    expect(elements[2].textContent).toContain('Click Me');
  });

  it('should preserve the projected content order', () => {
    const card = fixture.nativeElement.querySelector('.card');

    const elements = card.querySelectorAll('h2, p, button');

    expect(elements[0].tagName).toBe('H2');
    expect(elements[1].tagName).toBe('P');
    expect(elements[2].tagName).toBe('BUTTON');
  });
});
