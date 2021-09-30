import { NodePropertyData } from "../graph_node_functionality/interfaces/NodePropertyData";
import { Author } from "./Author";

export interface MaterialGraph {
  parentId: string;
  id: string;
  data: NodePropertyData<any>[];
  author?: Author;
  createdAt?: Date;
}
