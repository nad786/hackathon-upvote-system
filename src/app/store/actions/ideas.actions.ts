import { IUser } from './../../modals/IUser';
import { IIdeas } from '../../modals/IIdeas';
import { createAction, props } from '@ngrx/store';

export const loadSpinners = createAction(
  '[Ideas] Load Spinners',
  props<{ loader: boolean }>()
);

export const getAllIdeas = createAction('[Ideas] get All Ideas');

export const updateIdeas = createAction(
  '[Ideas] Update Ideas',
  props<{ ideas: Array<IIdeas> }>()
);

export const setLoginUser = createAction(
  '[Ideas] Set Login User',
  props<{ user: IUser }>()
);
