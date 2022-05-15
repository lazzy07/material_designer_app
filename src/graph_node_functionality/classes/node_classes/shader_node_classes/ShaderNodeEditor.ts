import NodeEditor from "../common/NodeEditor";
import DataNodeEngine from "./ShaderNodeEngine";
import NodeLibrary from "../common/NodeLibrary";

export default class ShaderNodeEditor extends NodeEditor {
  constructor(domElement: HTMLDivElement) {
    super(domElement, new DataNodeEngine());
  }

  registerNodes = (nodeLibrary: NodeLibrary) => {
    const nodes = nodeLibrary.getReteNodes();
    for (const i of nodes) {
      this.getReteEditor().register(i);
      // this.engine.getReteEngine().register(i);
    }
  };
}
