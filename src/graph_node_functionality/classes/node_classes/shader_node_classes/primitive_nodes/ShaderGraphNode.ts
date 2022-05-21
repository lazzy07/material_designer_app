import { COLOR_SOCKET, GRAYSCALE_SOCKET } from "./../../../../ConnectionTypes";
import { Input, Output, Node } from "../../../../../packages/rete-1.4.4";
import ImageController from "../../../renderer/controls/ImageController";
import { Graphs } from "../../../../../interfaces/Graphs";
import ShaderNode from "../ShaderNode";
import { Data } from "../../../../../packages/rete-1.4.4/core/data";
import { getVarName } from "../../../../../renderer/services/GetNodesVarName";

export class ShaderGraphNode extends ShaderNode {
  async builder(node: Node) {
    const shaderGraph = (node.data as unknown as Graphs).shaderGraph!;
    const nodes = (shaderGraph.data as Data).nodes;
    node.meta = { engineType: "shaderGraph" };

    let isOutput = false;
    let isInput = false;
    let operationType = "grayscale";

    for (const nodeData of Object.values(nodes)) {
      const initID = nodeData.data.id;
      if (initID == "1") {
        node.addInput(
          new Input(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            COLOR_SOCKET
          )
        );
        operationType = "color";
        isInput = true;
      } else if (initID == "7") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            COLOR_SOCKET
          )
        );
        operationType = "color";
        isOutput = true;
      } else if (initID == "2") {
        node.addInput(
          new Input(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            GRAYSCALE_SOCKET
          )
        );
        isInput = true;
      } else if (initID == "8") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            GRAYSCALE_SOCKET
          )
        );
        isOutput = true;
      }
    }

    if (isInput && !isOutput) {
      (node.data as any).dataGraph.ioType = "generator";
    } else if (!isInput && isOutput) {
      (node.data as any).dataGraph.ioType = "output";
    } else {
      (node.data as any).dataGraph.ioType = "process";
    }
    (node.data as any).dataGraph.operationType = operationType;
    node.addControl(
      new ImageController("Add", this.data.id, this.data.name, node)
    );
  }
}
