import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() isPrimary: boolean = false
  @Input() isLoggedIn: boolean = false;
  @Input() isChat: boolean
  @Input() chatTitle: string

  constructor(private router: Router, private authService: AuthService) {
  }

  logout(): void {
    this.authService.logout()
  }
}
