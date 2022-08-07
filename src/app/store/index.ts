import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ideaReducer } from './reducers/ideas.reducer';

export const reducers: ActionReducerMap<any> = {
  ideas: ideaReducer,
};
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];
