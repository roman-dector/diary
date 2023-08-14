import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'entities/user/model/user.service';

@Component({
  selector: 'app-root',
  template: ` <router-outlet /> `,
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.loggedIn.subscribe((value) => {
      if (!value) {
        this.router.navigate(['/auth']);
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
