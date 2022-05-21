import { NodeData } from "./../../../../../packages/rete-1.4.4/core/data";
import {
  BOOLEAN_SOCKET,
  COLORVEC3_SOCKET,
  COLORVEC_SOCKET,
  LUT3_SOCKET,
  LUT_SOCKET,
  NUMBER2_SOCKET,
  NUMBER_SOCKET,
} from "./../../../../ConnectionTypes";
import { Input, Output, Node } from "../../../../../packages/rete-1.4.4";
import { Graphs } from "../../../../../interfaces/Graphs";
import DataNode from "../DataNode";
import NameController from "../../../renderer/controls/NameController";
import { getVarName } from "../../../../../renderer/services/GetNodesVarName";

export class DataGraphNode extends DataNode<any> {
  async builder(node: Node) {
    const dataGraph = (node.data as unknown as Graphs).dataGraph!;
    const nodes = (dataGraph.data as any).nodes;
    node.meta = { engineType: "dataGraph" };

    let isInput = false;
    let isOutput = false;

    for (const nodeData of Object.values(nodes) as any) {
      const initID = nodeData.data.id;
      if (initID == "1" || initID == "2" || initID == "6" || initID == "8") {
        node.addInput(
          new Input(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            NUMBER_SOCKET
          )
        );
        isInput = true;
      } else if (initID == "3" || initID == "9") {
        node.addInput(
          new Input(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            NUMBER2_SOCKET
          )
        );
        isInput = true;
      } else if (initID == "4") {
        node.addInput(
          new Input(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            BOOLEAN_SOCKET
          )
        );
        isInput = true;
      } else if (initID == "10") {
        node.addInput(
          new Input(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            LUT_SOCKET
          )
        );
        isInput = true;
      } else if (initID == "11") {
        node.addInput(
          new Input(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            LUT3_SOCKET
          )
        );
        isInput = true;
      } else if (initID == "12") {
        node.addInput(
          new Input(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            COLORVEC_SOCKET
          )
        );
        isInput = true;
      } else if (initID == "13") {
        node.addInput(
          new Input(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            COLORVEC3_SOCKET
          )
        );
        isInput = true;
      } else if (initID == "28") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            NUMBER_SOCKET
          )
        );
        isOutput = true;
      } else if (initID == "29") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            NUMBER2_SOCKET
          )
        );
        isOutput = true;
      } else if (initID == "30") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            COLORVEC_SOCKET
          )
        );
        isOutput = true;
      } else if (initID == "31") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            COLORVEC3_SOCKET
          )
        );
        isOutput = true;
      } else if (initID == "32") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            BOOLEAN_SOCKET
          )
        );
        isOutput = true;
      } else if (initID == "33") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            LUT_SOCKET
          )
        );
        isOutput = true;
      } else if (initID == "34") {
        node.addOutput(
          new Output(
            nodeData.id.toString(),
            getVarName(nodeData.data as any),
            LUT3_SOCKET
          )
        );
        isOutput = true;
      }
    }

    if (isInput && !isOutput) {
      (node.data as any).dataGraph.ioType = "generator";
    } else if (!isInput && isOutput) {
      (node.data as any).ioType = "output";
    } else {
      (node.data as any).ioType = "process";
    }

    node.addControl(
      new NameController("Data", this.data.id, this.data.name, node)
    );
  }
}
