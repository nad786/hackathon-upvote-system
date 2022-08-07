import { selectIdeas } from '../../store/selectors/ideas.selectors';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IIdeas } from '../../modals/IIdeas';
import { HttpService } from '../../services/http.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  getAllIdeasFromStore,
  getUser,
} from '../../store/selectors/ideas.selectors';
import { getAllIdeas } from '../../store/actions/ideas.actions';

@Component({
  selector: 'app-add-idea',
  templateUrl: './add-idea.component.html',
  styleUrls: ['./add-idea.component.scss'],
})
export class AddIdeaComponent implements OnInit {
  public ideaForm: FormGroup | any = null;
  @Input() ideas: Array<IIdeas> | any = [];
  @Input() idea: IIdeas | any = {};
  @Input() edit = false;
  selectedIndex = -1;
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
  ) {}

  createForm(userName: string) {
    this.ideaForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      createdBy: userName,
      vote: this.fb.array([]),
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
    this.store.pipe(select(getUser)).subscribe((res) => {
      this.createForm(res.userId);
      if (this.edit) {
        this.ideaForm.patchValue(this.idea);
        this.tags.forEach((tag: any) => {
          tag['selected'] = this.ideaForm.value.tags.includes(tag.title);
        });

        this.selectedIndex = this.ideas.findIndex(
          (idea: any) => idea.createdOn == this.idea['createdOn']
        );
      }
    });
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
    if (!this.edit) {
      this.ideas.push(this.ideaForm.value);
    } else {
      this.ideas[this.selectedIndex] = this.ideaForm.value;
    }

    this.http.post(this.ideas).subscribe((res) => {
      this.router.navigate(['./login']).then((val) => {
        this.store.dispatch(getAllIdeas());
        this.router.navigate(['./ideas']);
      });
    });
  }

  onReset() {
    this.router.navigate(['./login']).then((val) => {
      this.router.navigate(['./ideas']);
    });
  }
}
