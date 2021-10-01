import { Graphs } from "../../../../interfaces/Graphs";
import { Store } from "../../../../redux/reducers";
import { store } from "../../../../redux/store";
import NodeLibrary from "../common/NodeLibrary";
import DataGraphReference from "../../data_node_classes/DataGraphReference";
import GraphReference from "../common/GraphReference";

export default class DataNodeLibrary extends NodeLibrary {
  constructor() {
    super();
    const nodes = this.getNodes();
    this.reteNodes = this.initReteNodes(nodes);
  }

  getNodes() {
    const state: Store = store.getState();
    return state.graphLibraries.dataGraphNodes;
  }

  initReteNodes(nodes: Graphs[]) {
    const reteNodes: GraphReference[] = [];
    for (const i of nodes) {
      reteNodes.push(new DataGraphReference(i));
    }
    return reteNodes;
  }
}
