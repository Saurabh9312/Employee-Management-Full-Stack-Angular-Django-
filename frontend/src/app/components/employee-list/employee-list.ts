import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    FormsModule, CommonModule, ReactiveFormsModule, MatIconModule, MatTableModule, MatPaginator, MatSort, MatIcon
  ],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css'],
})
export class EmployeeList implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    "fullname", "email", "phone", "designation", "department",
    "salary", "dateofjoining", "status", "address", "actions"
  ];

  dataSource = new MatTableDataSource<any>();
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) { }

  isSubAdmin(): boolean {
    return this.api.isSubAdmin();
  }

  isAdmin(): boolean {
    return this.api.isAdmin();
  }

  ngOnInit() {
    this.api.getList().subscribe((res) => {
      const list = Array.isArray(res) ? res : res.data;
      this.dataSource.data = list;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onButtonClick(id: any) {
    if (id) this.router.navigate(['/employees/view', id]);
  }

  edit(id: any) {
    if (id) this.router.navigate(['/employees/edit', id]);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  add() {
    this.router.navigate(['/employees/add']);
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/employees/delete', id]);
      }
    });
  }
}
