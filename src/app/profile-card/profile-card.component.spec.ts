import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardComponent } from './profile-card.component';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCardComponent);
    fixture.componentRef.setInput('title', 'Products');

    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name as John', () => {
    fixture.detectChanges();
    const h2Ele = fixture.nativeElement.querySelector('h2');
    
    expect(h2Ele.textContent).toEqual('John');
  });

  it('should render email as john@example.com', () => {
    fixture.detectChanges();
    const pEle = fixture.nativeElement.querySelector('p');
    
    expect(pEle.textContent).toEqual('john@example.com');
  });

  it('should render 2 text elements', () => {
    const textEle = fixture.nativeElement.querySelectorAll('h2, p');
    
    expect(textEle).toHaveLength(2);
  });

  describe('Required input signal', () => {
    
    it('should have the correct title input', () => {
      expect(component.title()).toBe('Products');
    });

    it('should display the title', () => {
      fixture.detectChanges();
      const h2 = fixture.nativeElement.querySelector('h1');

      expect(h2.textContent).toContain('Products');
    });

    it('should show title to be My Profile', () => {
      fixture.componentRef.setInput('title', 'My Profile');

      fixture.detectChanges();
      const h1Ele = fixture.nativeElement.querySelector('h1');
      expect(h1Ele.textContent).toEqual('My Profile');
    });
  });

  describe('Emit events', () => {
    it('should emit 42 when save is called', () => {
      let emittedValue: number | undefined;

      component.saved.subscribe(value => {
        emittedValue = value;
      });

      component.save();

      expect(emittedValue).toBe(42);
    });

    it('should emit once when save is called', () => {
      const emittedValues: number[] = [];

      component.saved.subscribe(value => {
        emittedValues.push(value);
      });

      component.save();

      expect(emittedValues).toHaveLength(1);
      expect(emittedValues[0]).toBe(42);
    });

    it('should emit 42 each time save is called', () => {
      const emittedValues: number[] = [];

      component.saved.subscribe(value => {
        emittedValues.push(value);
      });

      component.save();
      component.save();

      expect(emittedValues).toEqual([42, 42]);
    });

    it('should emit 42 when save is called', () => {
      let value: number | undefined;

      component.saved.subscribe(v => value = v);

      component.save();

      expect(value).toBe(42);
    });
  });

  describe('Loading', () => {
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

      const h4Element = fixture.nativeElement.querySelector('[data-testid="loaded"]');

      expect(h4Element).not.toBeNull();
      expect(h4Element.textContent).toContain('Products Loaded');
    });

    it('should show Loading when loading is true', () => {
      fixture.detectChanges();

      component.loading.set(true);

      fixture.detectChanges();

      const h4Element = fixture.nativeElement.querySelector('[data-testid="loading-message"]');

      expect(h4Element).not.toBeNull();
      expect(h4Element.textContent).toContain('Loading...');
    });
  });

  describe('Products signal', () => {
    it('Should have length 3', () => {
      component.products.set([
        { id: 1, name: 'Laptop' },
        { id: 2, name: 'Mouse' },
        { id: 3, name: 'Keyboard' }
      ]);

      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('li');

      expect(items).toHaveLength(3);
      expect(items[0].textContent).toContain('Laptop');
      expect(items[1].textContent).toContain('Mouse');
      expect(items[2].textContent).toContain('Keyboard');
    });

    it('Should have length 0', () => {
      component.products.set([]);

      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('li');

      expect(items).toHaveLength(0);
    });

    it('should render products in the correct order', () => {
      component.products.set([
        { id: 1, name: 'Laptop' },
        { id: 2, name: 'Mouse' },
        { id: 3, name: 'Keyboard' }
      ]);

      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('li');

      const productNames = Array.from(items).map(
        (item: HTMLLIElement) => item.textContent?.trim()
      );

      expect(productNames).toEqual([
        'Laptop',
        'Mouse',
        'Keyboard'
      ]);
    });
  });

  describe('Doubled', () => {
    it('should have an initial count of 0', () => {
      expect(component.count()).toBe(0);
    });

    it('should have an initial doubled value of 0', () => {
      expect(component.doubled()).toBe(0);
    });

    it('should display the initial doubled value in the DOM', () => {
      fixture.detectChanges();

      const h4 = fixture.nativeElement.querySelector('[data-testid="doubled-count"]');

      expect(h4.textContent).toContain('0');
    });

    it('should increment the count multiple times', () => {
      component.increment();
      component.increment();
      component.increment();

      expect(component.count()).toBe(3);
    });

    it('should update the doubled value after multiple increments', () => {
      component.increment();
      component.increment();
      component.increment();

      expect(component.count()).toBe(3);
      expect(component.doubled()).toBe(6);
    });

    it('should update the DOM after incrementing', () => {
      fixture.detectChanges();

      let h4 = fixture.nativeElement.querySelector('[data-testid="doubled-count"]');
      expect(h4.textContent).toContain('0');

      component.increment();
      fixture.detectChanges();

      h4 = fixture.nativeElement.querySelector('[data-testid="doubled-count"]');

      expect(h4.textContent).toContain('2');
    });

     it('should always calculate doubled correctly', () => {
      expect(component.doubled()).toBe(0);

      component.increment();
      expect(component.doubled()).toBe(2);

      component.increment();
      expect(component.doubled()).toBe(4);

      component.increment();
      expect(component.doubled()).toBe(6);
    });

    it('should recalculate doubled when count changes', () => {
      component.count.set(5);
      expect(component.doubled()).toBe(10);

      component.count.set(10);
      expect(component.doubled()).toBe(20);

      component.count.set(25);
      expect(component.doubled()).toBe(50);
    });
  });
});
