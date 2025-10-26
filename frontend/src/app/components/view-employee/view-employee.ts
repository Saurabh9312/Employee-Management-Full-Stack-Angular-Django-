import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- for ngClass & date pipe
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [
    CommonModule,           // <-- important
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink
  ],
  templateUrl: './view-employee.html',
  styleUrls: ['./view-employee.css'],  // fixed typo: styleUrls instead of styleUrl
})
export class ViewEmployee {
  detailArray: any = [];

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getDetail(id);
      } else {
        console.error('Invalid ID');
      }
    });
  }

  getDetail(id: any) {
    this.api.getDetail(id).subscribe(res => {
      this.detailArray = Array.isArray(res) ? res : res;
    });
  }
}
