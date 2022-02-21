import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSliderModule, MatSelectModule, MatDialogModule, MatIconModule],
  exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSliderModule, MatSelectModule, MatDialogModule, MatIconModule]
})
export class WelcomeMaterialModule {
}
