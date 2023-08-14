import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'auth-form',
  template: `
    <div class="auth-form" [ngSwitch]="formType">
      <ng-container *ngSwitchCase="true">
        <h1>Log in to Diary</h1>

        <login-form #login [toggleForm]="toggleForm" />

        <p class="signup-switch" (click)="toggleForm()">
          Don't have an account? Sign Up!
        </p>
      </ng-container>

      <ng-container *ngSwitchCase="false">
        <h1>Sign up for Diary</h1>

        <signup-form #signup />

        <p class="signup-switch" (click)="toggleForm()">
          Already have an account? Log In!
        </p>
      </ng-container>
    </div>
  `,
  styleUrls: ['./auth-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AuthFormComponent {
  /**
   * @param formType - определяет текущее отобращение формы - login или signup
   */
  formType = true;

  constructor() {
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.formType = !this.formType;
  }
}
