import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WelcomeRoutingModule} from "./welcome-routing.module";
import { WelcomeComponent } from './welcome.component';
import { RegistrationComponent } from './registration/registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {TermsOfUseComponent} from "./terms-of-use/terms-of-use.component";
import {WelcomeMaterialModule} from './welcome-material.module';
import {SharedComponentsModule} from '../shared/components/shared-components.module';

@NgModule({
  declarations: [
    WelcomeComponent,
    RegistrationComponent,
    LoginComponent,
    TermsOfUseComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    ReactiveFormsModule,
    WelcomeMaterialModule,
    SharedComponentsModule
  ]
})
export class WelcomeModule { }
