import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  isOnline: boolean;
}

@Component({
  selector: 'app-user-profile',
  imports: [ CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user!: UserProfile;

  ngOnInit(): void {
    // Initialise with fallback mock data
    this.user = {
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatarUrl: 'https://dicebear.com',
      isOnline: true
    };
  }

  toggleOnline(): void {
    this.user.isOnline = !this.user.isOnline;
  }

  changeAvatar(): void {
    const randomSeed = Math.random().toString(36).substring(7);
    this.user.avatarUrl = `https://dicebear.com{randomSeed}`;
  }

  updateUser(newName: string, newEmail: string): void {
    if (newName.trim() && newEmail.trim()) {
      this.user.name = newName;
      this.user.email = newEmail;
    }
  }
}
