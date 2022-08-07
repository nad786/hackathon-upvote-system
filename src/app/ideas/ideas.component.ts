import { HttpService } from './../http.service';
import { getAllIdeas, updateIdeas } from './../store/actions/ideas.actions';
import { IIdeas } from './../modals/IIdeas';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  getAllIdeasFromStore,
  getUser,
} from '../store/selectors/ideas.selectors';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss'],
})
export class IdeasComponent implements OnInit {
  ideas: Array<any> = [];
  userName = '';
  constructor(private store: Store<any>, private http: HttpService) {
    this.store.pipe(select(getAllIdeasFromStore)).subscribe((data) => {
      this.ideas = JSON.parse(JSON.stringify(data));
    });
    this.store.pipe(select(getUser)).subscribe((res) => {
      this.userName = res.userId;
    });
  }

  ngOnInit(): void {}

  updateLike(votes: any) {
    if (votes.includes(this.userName)) {
      const index = votes.findIndex((idea: string) => idea == this.userName);
      votes.splice(index, 1);
    } else {
      votes.push(this.userName);
    }

    this.http.post(this.ideas).subscribe((res) => {
      console.log(res);
      this.store.dispatch(getAllIdeas());
    });
  }
}
