import { NodePropertyData } from "./../../../interfaces/NodePropertyData";
import { Graphs, GRAPH_TYPES } from "../../../../interfaces/Graphs";
import { Component, Node } from "../../../../packages/rete-1.4.4";

import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import {
  NodeData,
  WorkerInputs,
  WorkerOutputs,
} from "../../../../packages/rete-1.4.4/core/data";
import ShaderNodeEditor from "./ShaderNodeEditor";

export default abstract class ShaderNode extends Component {
  data: Graphs;
  meta: { engineType: GRAPH_TYPES };
  nodeEditor: ShaderNodeEditor;

  constructor(
    data: Graphs,
    engineType: GRAPH_TYPES,
    shaderNodeEditor: ShaderNodeEditor
  ) {
    super(data.name);
    this.data = { ...data };
    this.meta = { engineType };
    this.nodeEditor = shaderNodeEditor;
  }

  async builder(node: Node) {
    for (let np of (node.data as any).dataGraph!
      .data as NodePropertyData<any>[]) {
      if (np.id === "var_name") {
        np.data = uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
          separator: "_",
          length: 3,
        });
      }
    }
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): void {
    const tex = node.meta.tex;
    if (tex)
      for (const nodeE of this.nodeEditor.getReteEditor().nodes) {
        if (node.id === nodeE.id) {
          nodeE.controls.forEach((control) => {
            const id: string = (control as any).id;

            const canvas = document.getElementById(id) as HTMLCanvasElement;

            if (canvas) {
              var ctx = canvas.getContext("2d");
              if (ctx) ctx.putImageData(tex as ImageData, 0, 0);
            }
          });
        }
      }
  }
}
