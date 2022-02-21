import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {SharedComponentsModule} from '../shared/components/shared-components.module';

// This routes are made with the idea that the future releases will include multiple checker apis.
const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'checkers',
    children: [
      {
        path: '',
        redirectTo: 'endlessmedical',
        pathMatch: 'full'
      },
      {
        path: 'endlessmedical',
        loadChildren: () => import('./checkers/endless-medical/endless-medical.module').then(m => m.EndlessMedicalModule)
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes), SharedComponentsModule],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
