import { Author } from "./Author";

export interface MaterialGraph {
  parentId: string;
  data: {};
  author?: Author;
  createdAt?: Date;
}
