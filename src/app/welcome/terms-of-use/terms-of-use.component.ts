import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent {

  constructor(public dialogRef: MatDialogRef<TermsOfUseComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
