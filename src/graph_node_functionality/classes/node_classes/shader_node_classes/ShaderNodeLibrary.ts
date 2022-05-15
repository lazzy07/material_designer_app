import { Graphs } from "../../../../interfaces/Graphs";
import { Store } from "../../../../redux/reducers";
import { store } from "../../../../redux/store";
import GraphReference from "../common/GraphReference";
import NodeLibrary from "../common/NodeLibrary";
import { getNodeFromFactory } from "./PrimitiveNodeFactory";
import ShaderNodeEditor from "./ShaderNodeEditor";

export default class ShaderNodeLibrary extends NodeLibrary {
  shaderNodeEditor: ShaderNodeEditor;

  constructor(shaderNodeEditor: ShaderNodeEditor) {
    super();
    const nodes = this.getNodes();
    this.shaderNodeEditor = shaderNodeEditor;
    this.reteNodes = this.initReteNodes(nodes);
  }

  getNodes() {
    const state: Store = store.getState();
    return state.graphLibraries.shaderGraphNodes;
  }

  registerNodes = (nodeLibrary: NodeLibrary) => {
    const nodes = nodeLibrary.getNodes();
  };

  initReteNodes = (nodes: Graphs[]) => {
    const reteNodes: GraphReference[] = [];
    for (const i of nodes) {
      reteNodes.push(getNodeFromFactory(i, this.shaderNodeEditor));
    }
    return reteNodes;
  };
}
