import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'shared/api/auth.service';

@Component({
  selector: 'logout-button',
  template: `
    <p-button type="button" (onClick)="onLogOut()">Log Out</p-button>
  `,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LogoutButtonComponent {
  email: string = 'rts@gmail.com';
  password: string = '124qwe';

  constructor(private auth: AuthService) {}

  async onLogOut() {
    await this.auth.logout();
  }
}
