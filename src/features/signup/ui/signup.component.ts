import { Component, ViewEncapsulation } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'shared/api/auth.service';

@Component({
  selector: 'signup-form',
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
        <input
          class="row"
          pPassword
          [feedback]="true"
          placeholder="password"
          [(ngModel)]="password"
        />
      </div>
      <p-button label="Submit" class="button" (onClick)="onSubmit()" />
    </div>
  `,
  styleUrls: ['../../../shared/styles/auth-form.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SignUpFormComponent {
  email: string = '';
  password: string = '';

  logging = false;

  constructor(
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  async onSubmit() {
    if (this.password.length < 6) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Password',
        detail: 'Password should be at least 6 characters',
      });
      return;
    }

    try {
      this.logging = true;
      await this.auth.signup(this.email, this.password);
      this.logging = false;
    } catch (err) {
      this.logging = false;

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/invalid-email':
            this.messageService.add({
              severity: 'error',
              summary: 'Invalid Email',
              detail: 'Provide a valid email value',
            });
            break;
          case 'auth/email-already-exists':
            this.messageService.add({
              severity: 'error',
              summary: 'Email Already Exists',
              detail: 'The user with this email already exists',
            });
            break;
        }
      }
    }
  }
}
