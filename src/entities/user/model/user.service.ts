import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class UserService {
  loggedIn = new BehaviorSubject<boolean>(false);
  currentUser = new BehaviorSubject<firebase.default.User | null>(null);

  constructor(private fireAuth: AngularFireAuth) {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.fireAuth.onAuthStateChanged((user) => {
      this.currentUser.next(user);
      this.loggedIn.next(user ? true : false);
    });
  }

  onLogOut() {
    this.loggedIn.next(false);
    this.currentUser.next(null);
  }
}
