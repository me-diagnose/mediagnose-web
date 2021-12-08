import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit, OnDestroy {
  isLoggedInSub$: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedInSub$ = this.authService.isLoggedIn$().subscribe((value: boolean) => {
      if (value) {
        this.router.navigate(['home'])
      }
    });
  }

  ngOnDestroy(): void{
    this.isLoggedInSub$.unsubscribe();
  }
}
