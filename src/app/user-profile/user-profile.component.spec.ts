import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent, CommonModule, MatCardModule, MatButtonModule, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Visual Displays', () => {
    it('should display the core user profile attributes correctly', () => {
      const nameEl = fixture.debugElement.query(By.css('[data-testid="user-name"]')).nativeElement;
      const emailEl = fixture.debugElement.query(By.css('[data-testid="user-email"]')).nativeElement;
      const avatarEl = fixture.debugElement.query(By.css('[data-testid="avatar-img"]')).nativeElement;

      expect(nameEl.textContent).toContain('John Smith');
      expect(emailEl.textContent).toContain('john.smith@example.com');
      expect(avatarEl.getAttribute('src')).toContain('https://dicebear.com');
    });

    it('should toggle green status-badge styling based on online state', () => {
      const badgeEl = fixture.debugElement.query(By.css('[data-testid="status-indicator"]')).nativeElement;
      
      expect(badgeEl.classList.contains('online')).toBe(true);
      expect(badgeEl.classList.contains('offline')).toBe(false);
    });

    it('should display the user name', () => { 
      const element = fixture.nativeElement .querySelector('[data-testid="user-name"]'); 
      expect(element.textContent.trim()).toBe("John Smith"); 
    }); 
    
    it('should display the user email', () => { 
      const element = fixture.nativeElement .querySelector('[data-testid="user-email"]'); 
      expect(element.textContent.trim()).toBe('john.smith@example.com'); 
    });
  });

  describe('Features Actions', () => {
    it('should alternate user online status upon calling toggleOnline()', () => {
      const toggleBtn = fixture.debugElement.query(By.css('[data-testid="btn-toggle"]'));
      expect(toggleBtn).toBeTruthy();

      toggleBtn.triggerEventHandler('click', null);
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('[data-testid="status-indicator"]')).nativeElement;
      expect(component.user.isOnline).toBe(false);
      expect(badgeEl.classList.contains('offline')).toBe(true);
    });

    it('should alter avatar string location on changeAvatar interaction', () => {
      const initialAvatar = component.user.avatarUrl;
      const avatarBtn = fixture.debugElement.query(By.css('[data-testid="btn-avatar"]'));

      avatarBtn.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.user.avatarUrl).not.toBe(initialAvatar);
    });

    it('should dynamically re-render updated user texts inside the markup blocks', () => {
      const updateBtn = fixture.debugElement.query(By.css('[data-testid="btn-update"]'));

      updateBtn.triggerEventHandler('click', null);
      fixture.detectChanges();

      const nameEl = fixture.debugElement.query(By.css('[data-testid="user-name"]')).nativeElement;
      const emailEl = fixture.debugElement.query(By.css('[data-testid="user-email"]')).nativeElement;

      expect(nameEl.textContent).toContain('Alex Smith');
      expect(emailEl.textContent).toContain('alex.smith@example.com');
    });
  });
});
