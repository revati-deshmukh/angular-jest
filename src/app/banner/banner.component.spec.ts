import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
  });

  /** Commented this test as added autodetection provider in beforeeach so it will
   * automatically update a DOM so this test will never pass */
  // it('no title in the DOM after createComponent()', () => {
  //   expect(h1.textContent).toEqual('');
  // });

  it('should display original title', () => {
    // fixture.detectChanges();

    expect(h1.textContent).toContain(component.title());
  });

  it('should display a different test title', () => {
    component.title.set('Test Title');
    fixture.detectChanges();
    expect(h1.textContent).toContain('Test Title');
  });

  it('should still see original title after comp.title change', async () => {
    const oldTitle = component.title();
    const newTitle = 'Test Title';
    component.title.set(newTitle);
    // Displayed title is old because Angular didn't yet run change detection
    expect(h1.textContent).toContain(oldTitle);
    await fixture.whenStable();
    expect(h1.textContent).toContain(newTitle);
  });
});
