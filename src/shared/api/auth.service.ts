import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  async signup(email: string, password: string) {
    try {
      await this.fireAuth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log({
          code: err.code,
          customData: err.customData,
          name: err.name,
          message: err.message,
        });
      }
    }
  }

  async login(email: string, password: string) {
    try {
      await this.fireAuth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    try {
      await this.fireAuth.signOut();
    } catch (err) {
      throw err;
    }
  }
}
