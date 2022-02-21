import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

const DURATION = 3;

@Injectable({providedIn: 'root'})
export class ErrorService {

  constructor(readonly snackBar: MatSnackBar) {}

  showError(message: string): void {
    this.snackBar.open(message, '', {
      duration: DURATION * 1000
    });
  }
}
