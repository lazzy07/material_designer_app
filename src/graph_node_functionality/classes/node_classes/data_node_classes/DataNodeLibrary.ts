import { Store } from "../../../../redux/reducers";
import { store } from "../../../../redux/store";
import NodeLibrary from "../common/NodeLibrary";

export default class DataNodeLibrary extends NodeLibrary {
  getNodes(){
    const state:Store = store.getState()
    return state.graphLibraries.dataGraphNodes;
  }
}
