import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {CheckersComponent} from './checkers/checkers.component';
import {SharedComponentsModule} from '../shared/components/shared-components.module';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    CheckersComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedComponentsModule,
    MatCardModule,
    MatIconModule
  ]
})
export class HomeModule {
}
