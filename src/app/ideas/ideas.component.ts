import { HttpService } from './../http.service';
import { getAllIdeas, updateIdeas } from './../store/actions/ideas.actions';
import { IIdeas } from './../modals/IIdeas';
import { Observable } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  getAllIdeasFromStore,
  getUser,
} from '../store/selectors/ideas.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss'],
})
export class IdeasComponent implements OnInit {
  ideas: Array<any> = [];
  userName = '';
  edit = false;
  idea: IIdeas | any = {};
  selectedIndex = 0;
  sortByDate: boolean | null = null;
  sortByVote: boolean | null = null;
  constructor(
    private store: Store<any>,
    private http: HttpService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.store.pipe(select(getAllIdeasFromStore)).subscribe((data) => {
      this.ideas = JSON.parse(JSON.stringify(data));
      this.ideas = this.ideas.map((idea) => {
        if (idea.vote) {
          return idea;
        }
        return { ...idea, vote: [] };
      });
    });
    this.store.pipe(select(getUser)).subscribe((res) => {
      this.userName = res.userId;
    });
  }

  sortIdeasByDate() {
    this.sortByVote = null;
    this.sortByDate = !this.sortByDate;

    if (this.sortByDate) {
      this.ideas.sort((a, b) => a.createdOn - b.createdOn);
    } else {
      this.ideas.sort((a, b) => b.createdOn - a.createdOn);
    }

    // this.cd.detectChanges();
  }
  sortIdeasByVote() {
    this.sortByDate = null;
    this.sortByVote = !this.sortByVote;

    if (this.sortByVote) {
      this.ideas.sort((a, b) => a.vote.length - b.vote.length);
    } else {
      this.ideas.sort((a, b) => b.vote.length - a.vote.length);
    }
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

  addIdea() {
    this.router.navigate(['./add']);
  }

  editIdea(index: number) {
    this.selectedIndex = index;
    this.idea = this.ideas[index];
    this.edit = true;
  }
}
