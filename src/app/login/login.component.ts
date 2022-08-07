import { Router } from '@angular/router';
import { setLoginUser } from './../store/actions/ideas.actions';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userId = '';
  password = '';
  constructor(private store: Store<any>, private router: Router) {}

  login() {
    this.store.dispatch(
      setLoginUser({
        user: { userId: this.userId, password: this.password },
      })
    );
    this.router.navigate(['./ideas']);
  }
}
