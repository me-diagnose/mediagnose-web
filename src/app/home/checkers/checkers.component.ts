import {Component} from '@angular/core';

@Component({
  selector: 'app-checkers',
  template: '<h2>Symptom Checkers</h2>\n' +
    '<ul>\n' +
    '  <li routerLink="endlessmedical">EndlessMedical</li>\n' +
    '</ul>\n'
})
export class CheckersComponent {
}
