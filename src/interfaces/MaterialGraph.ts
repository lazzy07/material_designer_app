import { Author } from "./Author";

export interface MaterialGraph {
  id: string;
  parentId: string;
  data: {};
  author?: Author;
  createdAt?: Date;
}
