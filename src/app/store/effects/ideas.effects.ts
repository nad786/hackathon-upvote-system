import { getAllIdeas, updateIdeas } from '../actions/ideas.actions';
import { HttpService } from '../../http.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';

@Injectable()
export class IdeasEffect {
  constructor(private actions$: Actions, private http: HttpService) {}

  fetchAllIdeas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllIdeas),
      switchMap(() => {
        return this.http.get().pipe(
          map((ideas: any) => {
            return updateIdeas({ ideas: ideas });
          })
        );
      })
    )
  );
}
