import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  showLogin = true;
  isLoggedInSub$: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedInSub$ = this.authService.isLoggedIn$().subscribe((value: boolean) => {
      if (value) {
        this.router.navigate(['home'])
      }
    });
  }

  toggleShowLogin(): void {
    this.showLogin = !this.showLogin;
  }

  ngOnDestroy(): void{
    this.isLoggedInSub$.unsubscribe();
  }
}
