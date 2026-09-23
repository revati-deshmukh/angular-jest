import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../services/user.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  const mockUserService = {
    loadUsers: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        {provide: UserService, useValue: mockUserService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadUsers when the component initializes', () => {
    mockUserService.loadUsers.mockReturnValue([]);

    fixture.detectChanges();

    expect(mockUserService.loadUsers).toHaveBeenCalledTimes(1);
  });

  it('should render the users returned by the service', () => {
    const users: User[] = [
      { id: 1, name: 'Andrew' },
      { id: 2, name: 'John' },
      { id: 3, name: 'Sarah' }
    ];

    mockUserService.loadUsers.mockReturnValue(users);

    fixture.detectChanges();

    const paragraphs = fixture.nativeElement.querySelectorAll('p');

    expect(paragraphs).toHaveLength(3);

    expect(paragraphs[0].textContent).toContain('Andrew');
    expect(paragraphs[1].textContent).toContain('John');
    expect(paragraphs[2].textContent).toContain('Sarah');
  });

  it('should render no users when the service returns an empty list', () => {
    mockUserService.loadUsers.mockReturnValue([]);

    fixture.detectChanges();

    const paragraphs = fixture.nativeElement.querySelectorAll('p');

    expect(paragraphs).toHaveLength(0);
  });

  it('should store the users returned by the service', () => {
    const users: User[] = [
      { id: 1, name: 'Andrew' },
      { id: 2, name: 'John' }
    ];

    mockUserService.loadUsers.mockReturnValue(users);

    fixture.detectChanges();

    expect(component.users()).toEqual(users);
  });

  it('should handle an error from the service', () => {
    mockUserService.loadUsers.mockImplementation(() => {
      throw new Error('Failed to load users');
    });

    fixture.detectChanges();

    expect(component.error()).toBe('Failed to load users');
  });

  it('should display an error message when loading fails', () => {
    mockUserService.loadUsers.mockImplementation(() => {
      throw new Error('API failed');
    });

    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('p');

    expect(errorMessage.textContent).toContain('Failed to load users');
  });

  it('should display an error message when loading fails', () => {
    mockUserService.loadUsers.mockImplementation(() => {
      throw new Error('API failed');
    });

    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('p');

    expect(errorMessage.textContent).toContain('Failed to load users');
  });
});
