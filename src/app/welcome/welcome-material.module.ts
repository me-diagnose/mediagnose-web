import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule],
  exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule]
})
export class WelcomeMaterialModule {
}
