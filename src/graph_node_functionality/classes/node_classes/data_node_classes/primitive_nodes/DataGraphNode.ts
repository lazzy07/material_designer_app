import { Node } from "../../../../../packages/rete-1.4.4";
import { Graphs } from "../../../../../interfaces/Graphs";
import DataNode from "../DataNode";
import NameController from "../../../renderer/controls/NameController";
import { dataTypeToSocket } from "../../../../../renderer/services/DataTypeToSocket";

export class DataGraphNode extends DataNode<any> {
  async builder(node: Node) {
    const dataGraph = (node.data as unknown as Graphs).dataGraph!;
    const nodes = (dataGraph.data as any).nodes;
    node.meta = { engineType: "dataGraph" };
    (node.data as unknown as Graphs).type = "dataGraph";

    let isInput = false;
    let isOutput = false;

    for (const nodeData of Object.values(nodes) as any) {
      const initID = nodeData.data.id;
      const [input, output] = dataTypeToSocket(initID, node, nodeData);
      isInput = input;
      isOutput = output;
    }

    if (isInput && !isOutput) {
      (node.data as any).dataGraph.ioType = "generator";
    } else if (!isInput && isOutput) {
      (node.data as any).dataGraph.ioType = "output";
    } else {
      (node.data as any).dataGraph.ioType = "process";
    }

    node.addControl(
      new NameController("Data", this.data.id, this.data.name, node)
    );
  }
}
