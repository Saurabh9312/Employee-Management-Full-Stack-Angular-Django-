import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signupform',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './signupform.html',
  styleUrls: ['./signupform.css'],
})
export class Signupform implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['subadmin', Validators.required],
    });
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const formData = this.signupForm.value;

    this.http.post('http://127.0.0.1:8000/api/signup/', formData).subscribe({
      next: (res) => {
        this.snackBar.open('Signup successful! Redirecting...', 'Close', {
          duration: 2500,
          panelClass: ['snack-success'],
        });
        this.signupForm.reset();
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.snackBar.open('Signup failed! Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snack-error'],
        });
      },
    });
  }
}
