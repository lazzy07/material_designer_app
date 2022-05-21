import { KernelGraphData } from "./KernelGraph";
import { NodePropertyData } from "../graph_node_functionality/interfaces/NodePropertyData";
import { Data } from "../packages/rete-1.4.4/core/data";
import { Author } from "./Author";
import { NODE_IO_TYPE } from "./GraphNodeIOType";

export interface MaterialGraph {
  parentId: string;
  id: string;
  data: Data | NodePropertyData<any>[] | KernelGraphData;
  author?: Author;
  createdAt?: Date;
  ioType?: NODE_IO_TYPE;
  isSecondary?: boolean;
}
