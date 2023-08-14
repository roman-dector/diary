import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { MessageService } from 'primeng/api';
import { AuthService } from 'shared/api/auth.service';

@Component({
  selector: 'login-form',
  providers: [MessageService],
  template: `
    <div class="form">
      <p-progressSpinner *ngIf="logging" strokeWidth="3" class="spinner" />
      <p-toast position="top-center" />
      <div>
        <input
          class="row"
          type="text"
          pInputText
          [email]="true"
          [(ngModel)]="email"
          placeholder="email"
        />
        <p-password
          class="row"
          placeholder="password"
          [(ngModel)]="password"
          [feedback]="false"
        />
      </div>
      <p-button
        type="button"
        label="Log In"
        class="button"
        (onClick)="onSubmit()"
      />
    </div>
  `,
  styleUrls: ['../../../shared/styles/auth-form.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';

  logging = false;

  @Input() toggleForm: () => void;

  constructor(
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  async onSubmit() {
    try {
      this.logging = true;
      await this.auth.login(this.email, this.password);
      this.logging = false;
    } catch (err) {
      this.logging = false;

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/invalid-email':
            this.messageService.add({
              severity: 'error',
              summary: 'Invalid Email',
              detail: 'Enter a valid email',
            });
            break;
          case 'auth/user-not-found':
            this.messageService.add({
              severity: 'error',
              summary: 'User Not Found',
              detail: `It's seems you don't have an account\nPlease sign up`,
            });
            setTimeout(() => {
              this.toggleForm();
            }, 1500);
            break;
          case 'auth/wrong-password':
            this.messageService.add({
              severity: 'error',
              summary: 'Wrong Password',
              detail: 'Enter a valid password',
            });
            break;
        }
      }
    }
  }
}
