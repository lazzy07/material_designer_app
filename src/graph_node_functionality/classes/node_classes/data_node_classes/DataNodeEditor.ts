import NodeEditor from "../common/NodeEditor";
import DataNodeEngine from "./DataNodeEngine";
import NodeLibrary from "../common/NodeLibrary";

export default class DataNodeEditor extends NodeEditor {
  constructor(domElement: HTMLDivElement) {
    super(domElement, new DataNodeEngine());
  }

  registerNodes = (nodeLibrary: NodeLibrary) => {
    const nodes = nodeLibrary.getNodes();
    console.log(nodes);
  };
}
