import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WelcomeRoutingModule} from "./welcome-routing.module";
import { WelcomeComponent } from './welcome.component';
import { RegistrationComponent } from './registration/registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {TermsOfUseComponent} from "./terms-of-use/terms-of-use.component";

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
    ReactiveFormsModule
  ]
})
export class WelcomeModule { }
