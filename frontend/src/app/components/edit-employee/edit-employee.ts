import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.html',
  styleUrls: ['./edit-employee.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class EditEmployee implements OnInit {
  editForm!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    // Initialize form with validators
    this.editForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      dateofjoining: ['', Validators.required],
      status: ['', Validators.required],
      address: ['', Validators.required],
    });

    // Get employee ID from route params
    this.id = this.route.snapshot.params['id'];

    // Load employee data
    this.loadEmployeeData(this.id);
  }

  // Load existing employee data to patch the form
  loadEmployeeData(id: number): void {
    this.api.getDetail(id).subscribe({
      next: (res) => {
        this.editForm.patchValue({
          fullname: res.fullname,
          email: res.email,
          phone: res.phone,
          designation: res.designation,
          department: res.department,
          salary: res.salary,
          dateofjoining: res.dateofjoining,
          status: res.status,
          address: res.address,
        });
      },
      error: (err) => {
        console.error('Error loading employee data:', err);
        alert('Failed to load employee details!');
        this.router.navigate(['/employees']);
      }
    });
  }

  // Submit updated data
  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value;
      this.api.editEmployee(updatedData, this.id).subscribe({
        next: (res) => {
          alert('Employee updated successfully!');
          this.router.navigate(['/list']);
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          alert('Error updating employee. Please try again.');
        }
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }
}
