import NodeEditor from "../common/NodeEditor";
import DataNodeEngine from "./ShaderNodeEngine";
import NodeLibrary from "../common/NodeLibrary";

export default class SaderNodeEditor extends NodeEditor {
  constructor(domElement: HTMLDivElement) {
    super(domElement, new DataNodeEngine());
  }

  registerNodes = (nodeLibrary: NodeLibrary) => {
    const nodes = nodeLibrary.getNodes();
  };
}
