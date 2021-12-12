import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {hashPassword} from "../../utils/hashPassword.util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
 loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  async onSubmit(): Promise<void> {
    const {email, password}  = this.loginForm.value;
    const hashedPassword = hashPassword(password);
    await this.authService.login(email, hashedPassword)
  }

  isError(controlName: string): boolean {
    return this.loginForm.get(controlName)?.touched && !this.loginForm.get(controlName)?.valid || false
  }
}
