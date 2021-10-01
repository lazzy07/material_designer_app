import { Graphs } from "../../../../interfaces/Graphs";
import { Store } from "../../../../redux/reducers";
import { store } from "../../../../redux/store";
import GraphReference from "../common/GraphReference";
import NodeLibrary from "../common/NodeLibrary";

export default class ShaderNodeLibrary extends NodeLibrary {
  constructor() {
    super();
    const nodes = this.getNodes();
    this.reteNodes = this.initReteNodes(nodes);
  }

  getNodes() {
    const state: Store = store.getState();
    return state.graphLibraries.shaderGraphNodes;
  }

  registerNodes = (nodeLibrary: NodeLibrary) => {
    const nodes = nodeLibrary.getNodes();
  };

  initReteNodes = (graphs: Graphs[]) => {
    return [] as GraphReference[];
  };
}
