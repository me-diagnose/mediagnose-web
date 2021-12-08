import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
@NgModule({
  imports: [ MatInputModule, MatButtonModule, MatSliderModule, MatListModule],
  exports: [ MatInputModule, MatButtonModule, MatSliderModule, MatListModule]
})
export class EndlessMedicalMaterialModule {
}
