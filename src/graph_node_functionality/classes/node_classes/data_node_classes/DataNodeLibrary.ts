import { Graphs } from "../../../../interfaces/Graphs";
import { Store } from "../../../../redux/reducers";
import { store } from "../../../../redux/store";
import NodeLibrary from "../common/NodeLibrary";
import GraphReference from "../common/GraphReference";
import { getNodeFromFactory } from "./PrimitiveNodeFactory";

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
      reteNodes.push(getNodeFromFactory(i));
    }
    return reteNodes;
  }
}
