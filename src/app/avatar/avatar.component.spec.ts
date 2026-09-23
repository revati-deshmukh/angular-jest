import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <app-avatar [name]="user.name"></app-avatar>
  `
})
class TestHostComponent {
  user = {
    name: 'Revati'
  };
}

describe('AvatarComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the child component', () => {
    const avatar = fixture.nativeElement.querySelector('app-avatar');

    expect(avatar).not.toBeNull();
  });

  it('should pass the name to the child component', () => {
    const avatarDebugElement =
      fixture.debugElement.query(
        el => el.componentInstance instanceof AvatarComponent
      );

    const avatarComponent =
      avatarDebugElement.componentInstance as AvatarComponent;

    expect(avatarComponent.name()).toBe('Revati');
  });

  it('should update the child when the parent changes', () => {
    const avatarDebugElement =
      fixture.debugElement.query(
        el => el.componentInstance instanceof AvatarComponent
      );

    const avatarComponent =
      avatarDebugElement.componentInstance as AvatarComponent;

    expect(avatarComponent.name()).toBe('Revati');

    // Parent changes its value
    fixture.componentInstance.user.name = 'John';

    // Run Angular change detection
    fixture.detectChanges();

    expect(avatarComponent.name()).toBe('John');
  });
});
