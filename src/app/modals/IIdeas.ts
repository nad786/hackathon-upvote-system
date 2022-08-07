export interface IIdeas {
  title: string;
  description: string;
  tags: Array<string>;
  vote: { [key: string]: boolean };
  createdBy: string; // user
  createdOn: number;
}
