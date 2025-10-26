import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api-service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete.html',
  styleUrls: ['./delete.css'],
  imports: [MatDialogModule, MatButtonModule]
})
export class DeleteComponent {
  listArray: any = [];
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) {}

delete() {
  this.api.deleteEmployee(this.data.id).subscribe(() => {
    this.dialogRef.close(true);
  });
}


  cancel() {
    this.dialogRef.close(false);
  }
  // The dialog close is controlled by mat-dialog-close directive in the template
}
