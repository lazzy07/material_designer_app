import { Author } from "./Author";

export interface MaterialGraph {
  parentId: string;
  id: string;
  data: {};
  author?: Author;
  createdAt?: Date;
}
