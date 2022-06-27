import { DataGraphDraggableElement } from "../../../../../interfaces/DataGraphDraggableElement";
import { Graphs } from "../../../../../interfaces/Graphs";
import { Node } from "../../../../../packages/rete-1.4.4";
import { dataTypeToSocket } from "../../../../../renderer/services/DataTypeToSocket";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class DataReferenceNode extends DataProcessNode<any> {
  dragData: DataGraphDraggableElement;
  constructor(ref: DataGraphDraggableElement) {
    super(
      {
        type: "dataGraph",
        children: [],
        id: "any",
        contentType: "graph",
        name: "Dummy Data",
      },
      "dataGraph"
    );
    this.dragData = ref;
  }

  async builder(node: Node): Promise<void> {
    node.meta = { engineType: "dataGraph" };

    node.addControl(
      new NameController(
        "Ref",
        this.dragData.nodeId + "_" + this.dragData.dataitemId,
        this.dragData.dataItemName,
        node
      )
    );

    const nodeData = node.data;
    const initID: string = node.data.id as string;

    dataTypeToSocket(initID, node, nodeData);
  }
}
