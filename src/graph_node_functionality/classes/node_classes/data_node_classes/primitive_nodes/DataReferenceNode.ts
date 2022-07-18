import { DataGraphDraggableElement } from "../../../../../interfaces/DataGraphDraggableElement";
import { Node } from "../../../../../packages/rete-1.4.4";
import { dataTypeToSocketRef } from "../../../../../renderer/services/DataTypeToSocket";
import { DataRef } from "../../../../node_data/data_graph/35_DataRef";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class DataReferenceNode extends DataProcessNode<any> {
  dragData: DataGraphDraggableElement;

  constructor(ref: DataGraphDraggableElement) {
    super(DataRef(), "dataGraph");
    this.dragData = ref;
  }

  async builder(node: Node): Promise<void> {
    node.meta = { engineType: "dataGraph" };

    node.addControl(
      new NameController(
        "Ref",
        this.dragData.nodeId + "_" + this.dragData.dataItemId,
        this.dragData.dataItemName,
        node
      )
    );

    const nodeData = {
      id: 1,
      name: this.dragData.dataItemName,
    };
    const initID: string = (node.data as any).dataGraph.data.nodeType;
    dataTypeToSocketRef(initID, node, nodeData);
  }
}
