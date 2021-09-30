import { NODE_IO_TYPE } from "./GraphNodeIOType";
import { MaterialGraph } from "./MaterialGraph";

export interface DataGraph extends MaterialGraph {
  operationType: string;
  ioType?: NODE_IO_TYPE;
}
