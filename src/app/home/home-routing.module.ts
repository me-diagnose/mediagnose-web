import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';

const homeRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'checkers',
    children: [
      {path: '', redirectTo: 'endlessmedical', pathMatch: 'full'},
      {
        path: 'endlessmedical',
        loadChildren: () => import('./checkers/endless-medical/endless-medical.module').then(m => m.EndlessMedicalModule)
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
