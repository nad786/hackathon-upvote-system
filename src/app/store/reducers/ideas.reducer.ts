import { setLoginUser } from './../actions/ideas.actions';
import { createReducer, on } from '@ngrx/store';
import { InitialAppState } from '../../modals/InitialAppState';
import { loadSpinners, updateIdeas } from '../actions/ideas.actions';

export const ideaReducer = createReducer(
  InitialAppState,
  on(loadSpinners, (state, props) => ({
    ...state,
    loader: props.loader,
  })),
  on(updateIdeas, (state, props) => ({
    ...state,
    ideas: props.ideas,
  })),
  on(setLoginUser, (state, props) => ({
    ...state,
    user: props.user,
  }))
);
