import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {mustMatch} from "../../utils/mustMatch.util";
import {hashPassword} from '../../utils/hashPassword.util';

const USERNAME_MAX_LENGTH = 30;
const PASSWORD_MIN_LENGTH = 6;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  showTerms = false;
  usernameMaxLength = USERNAME_MAX_LENGTH;
  passwordMinLength = PASSWORD_MIN_LENGTH;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.buildRegistrationForm();
  }

  isError(controlName: string): boolean {
    return this.registrationForm.get(controlName)?.touched && !this.registrationForm.get(controlName)?.valid || false;
  }

  buildRegistrationForm(): void {
    this.registrationForm = this.fb.group({
        username: [null, [Validators.maxLength(this.usernameMaxLength), Validators.required]],
        email: [null, [Validators.email, Validators.required]],
        password: [null, [Validators.required, Validators.minLength(this.passwordMinLength)]],
        confirmPassword: [null, Validators.required],
        // Todo: Put age and sex controls back when we have a database
        // sex: [null, [Validators.required]],
        // age: [null, [Validators.min(18), Validators.max(100),Validators.required]],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validator: mustMatch('password', 'confirmPassword', 'passwordMatch')
      } as AbstractControlOptions)
  }

  toggleTerms(): void {
    this.showTerms = !this.showTerms;
  }

  hideTerms(): void {
    this.showTerms = false;
  }

  onSubmit(): void {
    const registrationInfo = {...this.registrationForm.value, password: hashPassword(this.registrationForm.get('password')?.value)}
    this.authService.register$(registrationInfo).subscribe((registered: boolean) => {
      if(registered) {
        this.router.navigate(['..','payment'])
      }
    })
  }

}

