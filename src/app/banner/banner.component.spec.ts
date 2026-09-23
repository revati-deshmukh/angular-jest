import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { By } from '@angular/platform-browser';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  describe("Banner ", () => {
    it('should create', () => {
      // const fixture = TestBed.createComponent(BannerComponent);
      // const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    // it('should contain "Banner works!"', () => {
    //   const bannerText: HTMLElement = fixture.nativeElement;
    //   expect(bannerText.textContent).toContain('banner works!');
    // })

    // it('should contain "Banner works!" using debugElement ', () => {
    //   const bannerText = fixture.debugElement.query(By.css('p'));
    //   expect(bannerText.nativeElement.textContent).toContain('banner works!');
    // });

    // it('should contain "Banner works!" using nativeElement ', () => {
    //   const bannerText: HTMLElement = fixture.nativeElement.querySelector('p');
    //   expect(bannerText.textContent).toContain('banner works!');
    //   expect(bannerText.textContent).toBe('banner works!');
    //   expect(bannerText.textContent).toEqual('banner works!');
    // })
  });

  describe('Button events', () => {
    it('should console logs "button is clicked"', () => {
      const btnElement = fixture.debugElement.query(By.css('button'));
      expect(btnElement.nativeElement.textContent).toContain('Click Me')
    });

    it('should console logs "button is clicked" using debugElement', () => {
      jest.spyOn(component, 'clickFunction');

      const btnElement = fixture.debugElement.query(By.css('button'));
      btnElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.clickFunction).toHaveBeenCalled();
      expect(component.count()).toBe(1);
    });

    it('should console logs "button is clicked" using nativeElement', () => {
      jest.spyOn(component, 'clickFunction');

      const btnElement = fixture.nativeElement.querySelector('button');
      btnElement.click();
      btnElement.click();
      btnElement.click();
      fixture.detectChanges();
      expect(component.clickFunction).toHaveBeenCalledTimes(3);
      expect(component.count()).toBe(3);
    });
  });

  describe('Loading signal', () => {
    it('should have initial value of loading signal, true', () => {
      expect(component.loading()).toBeTruthy();
    });

    it('should update loading signal to false', () => {
      fixture.detectChanges();
      expect(component.loading()).toBeFalsy();
    });

    it('should show p tag with Finished', () => {
      component.loading.set(true);

      fixture.detectChanges();

      const pElement = fixture.nativeElement.querySelector('[data-testid="finished-message"]');

      expect(pElement).not.toBeNull();
      expect(pElement.textContent).toContain('Finished');
    });

    it('should show Loading when loading is true', () => {
      fixture.detectChanges();

      component.loading.set(true);

      fixture.detectChanges();

      const pElement = fixture.nativeElement.querySelector('[data-testid="loading-message"]');

      expect(pElement).not.toBeNull();
      expect(pElement.textContent).toContain('Loading...');
    });
  })
});
