import { NODE_TYPES } from "../NodeTypes";
import NodeLibrary from "../node_libraries/NodeLibrary";

export default class NodeClass {
  id: string;
  name: string;
  type: NODE_TYPES;
  library: NodeLibrary;

  constructor(
    id: string,
    name: string,
    type: NODE_TYPES,
    library: NodeLibrary
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.library = library;
  }
}
