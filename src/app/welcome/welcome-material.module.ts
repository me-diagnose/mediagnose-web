import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSliderModule, MatSelectModule],
  exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSliderModule, MatSelectModule]
})
export class WelcomeMaterialModule {
}
