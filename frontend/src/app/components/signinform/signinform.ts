import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signinform',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  templateUrl: './signinform.html',
  styleUrls: ['./signinform.css'],
})
export class Signinform {
  username = '';
  password = '';
  rememberMe = false;

  constructor(private auth: ApiService, private router: Router, private snackBar: MatSnackBar) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.snackBar.open('Please fill all fields', 'Close', {
        duration: 2000,
        panelClass: ['snack-error'],
      });
      return;
    }

    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.snackBar.open('Login successful! Redirecting...', 'Close', {
          duration: 2500,
          panelClass: ['snack-success'],
        });

        // Navigate immediately after successful login
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.snackBar.open('Invalid username or password', 'Close', {
          duration: 3000,
          panelClass: ['snack-error'],
        });
      },
    });
  }
}