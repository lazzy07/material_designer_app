import { Store } from "../../../../redux/reducers";
import { store } from "../../../../redux/store";
import NodeLibrary from "../common/NodeLibrary";

export default class ShaderNodeLibrary extends NodeLibrary {
  getNodes() {
    const state: Store = store.getState();
    return state.graphLibraries.shaderGraphNodes;
  }

  registerNodes = (nodeLibrary: NodeLibrary) => {
    const nodes = nodeLibrary.getNodes();
  };
}
