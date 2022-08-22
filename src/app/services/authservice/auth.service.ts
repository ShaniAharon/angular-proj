import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: UserService, private router: Router) {}

  checkLoggedIn(): Observable<boolean> {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['signup']);
      return of(false);
    } else {
      return of(true);
    }
  }
  // canActivate(): boolean {
  //   if (!this.auth.isAuthenticated()) {
  //     this.router.navigate(['signup']);
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
}
