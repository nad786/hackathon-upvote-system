import { IAppState } from '../../modals/IAppState';
import { createSelector } from '@ngrx/store';

export const selectFeature = (InitialAppState: IAppState) => InitialAppState;

export const selectIdeas = createSelector(
  selectFeature,
  (state: any) => state.ideas
);

export const getUser = createSelector(
  selectIdeas,
  (state: IAppState) => state.user
);

export const getLoader = createSelector(
  selectIdeas,
  (state: IAppState) => state.loader
);

export const getAllIdeasFromStore = createSelector(
  selectIdeas,
  (state: IAppState) => state.ideas
);
