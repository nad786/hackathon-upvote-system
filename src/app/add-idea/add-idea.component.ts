import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IIdeas } from './../modals/IIdeas';
import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  getAllIdeasFromStore,
  getUser,
} from '../store/selectors/ideas.selectors';

@Component({
  selector: 'app-add-idea',
  templateUrl: './add-idea.component.html',
  styleUrls: ['./add-idea.component.scss'],
})
export class AddIdeaComponent implements OnInit {
  public ideaForm: FormGroup | any = null;
  ideas: Array<IIdeas> | any = [];
  tags = [
    { title: 'feature', selected: false },
    { title: 'tech', selected: false },
    { title: 'support', selected: false },
  ];
  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private store: Store<any>,
    private router: Router
  ) {
    this.store.pipe(select(getUser)).subscribe((res) => {
      this.createForm(res.userId);
    });
  }

  createForm(userName: string) {
    this.ideaForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      createdBy: userName,
      createdOn: new Date().getTime(), //works as id
    });
  }

  addtags() {
    this.ideaForm.get('tags')?.setValue(
      this.tags
        .filter((tag) => tag.selected)
        .map((item) => item.title)
        .join(' | ')
    );
  }

  ngOnInit(): void {
    this.store
      .pipe(select(getAllIdeasFromStore))
      .subscribe((res: Array<any>) => {
        this.ideas = [...res];
      });
  }

  onSubmit() {
    if (!this.ideas) {
      this.ideas = [];
    }
    this.ideas.push(this.ideaForm.value);
    this.http.post(this.ideas).subscribe((res) => {
      this.router.navigate(['/ideas']);
    });
  }

  onReset() {
    this.ideaForm.reset();
  }
}
