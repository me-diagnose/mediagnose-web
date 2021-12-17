import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {mustMatch} from '../../utils/mustMatch.util';
import {hashPassword} from '../../utils/hashPassword.util';
import {PaymentService} from '../../shared/services/payment.service';

const USERNAME_MAX_LENGTH = 30;
const PASSWORD_MIN_LENGTH = 6;
const AGE_MIN = 18;
const AGE_MAX = 100;
const AGE_DEFAULT = 35;

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
  minAge = AGE_MIN;
  maxAge = AGE_MAX;
  defaultAge = AGE_DEFAULT;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private paymentService: PaymentService) {
  }

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
        gender: [1],
        age: [this.defaultAge, [Validators.min(this.minAge), Validators.max(this.maxAge), Validators.required]],
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
    const registrationInfo = {
      ...this.registrationForm.value,
      password: hashPassword(this.registrationForm.get('password')?.value)
    }

    this.authService.register$(registrationInfo).subscribe(async (registered: boolean) => {
      if (registered) {
        const orderLink = await this.paymentService.initiatePaypalPayment();
        window.open(orderLink, '_blank');
      }
    })
  }

}

