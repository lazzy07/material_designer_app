import { NodePropertyData } from "../graph_node_functionality/interfaces/NodePropertyData";
import { Author } from "./Author";
import { NODE_IO_TYPE } from "./GraphNodeIOType";

export interface MaterialGraph {
  parentId: string;
  id: string;
  data: NodePropertyData<any>[] | any;
  author?: Author;
  createdAt?: Date;
  ioType?: NODE_IO_TYPE;
}
