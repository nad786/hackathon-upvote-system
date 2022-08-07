import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getUser } from './store/selectors/ideas.selectors';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getLoader } from './store/selectors/ideas.selectors';
import { getAllIdeas, setLoginUser } from './store/actions/ideas.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hackthon-upvote-system';
  loader$: Observable<boolean>;
  logout = false;
  constructor(private store: Store<any>, private router: Router) {
    this.store.dispatch(getAllIdeas());
    this.loader$ = this.store.pipe(select(getLoader));
    this.store.pipe(select(getUser)).subscribe((res) => {
      this.logout = !!res.userId;
    });
  }

  logoutUser() {
    this.store.dispatch(setLoginUser({ user: { userId: '', password: '' } }));
    this.router.navigateByUrl('login');
  }
}
