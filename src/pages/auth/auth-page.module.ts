import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from 'features/login';
import { SignUpFormComponent } from 'features/signup';
import { LogoutButtonComponent } from 'features/logout';
import { AuthFormComponent } from 'widgets/auth-form';
import { AuthPageComponent } from './ui';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AuthPageComponent,
    AuthFormComponent,
    LogoutButtonComponent,
    SignUpFormComponent,
    LoginFormComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
  exports: [
    AuthPageComponent,
    LogoutButtonComponent,
    SignUpFormComponent,
    LoginFormComponent,
  ],
})
export class AuthPageModule {}
