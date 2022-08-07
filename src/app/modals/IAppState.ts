import { IUser } from './IUser';
import { IIdeas } from './IIdeas';
export interface IAppState {
  user: IUser;
  ideas: Array<IIdeas>;
  loader: boolean;
}
