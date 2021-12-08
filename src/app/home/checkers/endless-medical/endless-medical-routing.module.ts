import {Route, RouterModule} from "@angular/router";
import {EndlessMedicalCheckerComponent} from "./endless-medical-checker/endless-medical-checker.component";
import {NgModule} from "@angular/core";

const endlessMedicalCheckerRoutes: Route[] = [
  {path: '', component: EndlessMedicalCheckerComponent}
]

@NgModule({
  imports: [RouterModule.forChild(endlessMedicalCheckerRoutes)],
  exports: [RouterModule]
})
export class EndlessMedicalCheckerRoutingModule {}
