import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'auth-page',
  template: `
    <div class="auth-page">
      <auth-form />
    </div>
  `,
  styles: [
    `
      .auth-page {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100vh;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AuthPageComponent {}
