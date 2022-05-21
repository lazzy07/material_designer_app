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
      } else if (initID == "7") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            COLOR_SOCKET
          )
        );
      } else if (initID == "2") {
        node.addInput(
          new Input(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            GRAYSCALE_SOCKET
          )
        );
      } else if (initID == "8") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            GRAYSCALE_SOCKET
          )
        );
      }
    }

    node.addControl(
      new ImageController("Add", this.data.id, this.data.name, node)
    );
  }
}
