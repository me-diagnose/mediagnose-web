import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatSliderModule, MatListModule, MatDialogModule, MatFormFieldModule],
  exports: [MatInputModule, MatButtonModule, MatSliderModule, MatListModule, MatDialogModule, MatFormFieldModule]
})
export class EndlessMedicalMaterialModule {
}
