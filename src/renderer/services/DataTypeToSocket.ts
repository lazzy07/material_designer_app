import { Input, Node, Output } from "../../packages/rete-1.4.4";
import { getVarName } from "./GetNodesVarName";
import {
  BOOLEAN_SOCKET,
  COLORVEC3_SOCKET,
  COLORVEC_SOCKET,
  LUT3_SOCKET,
  LUT_SOCKET,
  NUMBER2_SOCKET,
  NUMBER_SOCKET,
} from "../../graph_node_functionality/ConnectionTypes";

export const dataTypeToSocket = (initID: string, node: Node, nodeData: any) => {
  let isInput = false;
  let isOutput = false;

  let varName = getVarName(nodeData.data as any);
  let id = nodeData.id.toString();

  if (initID == "1" || initID == "2" || initID == "6" || initID == "8") {
    node.addInput(new Input(id, varName, NUMBER_SOCKET));
    isInput = true;
  } else if (initID == "3" || initID == "9") {
    node.addInput(new Input(id, varName, NUMBER2_SOCKET));
    isInput = true;
  } else if (initID == "4") {
    node.addInput(new Input(id, varName, BOOLEAN_SOCKET));
    isInput = true;
  } else if (initID == "10") {
    node.addInput(new Input(id, varName, LUT_SOCKET));
    isInput = true;
  } else if (initID == "11") {
    node.addInput(new Input(id, varName, LUT3_SOCKET));
    isInput = true;
  } else if (initID == "12") {
    node.addInput(new Input(id, varName, COLORVEC_SOCKET));
    isInput = true;
  } else if (initID == "13") {
    node.addInput(new Input(id, varName, COLORVEC3_SOCKET));
    isInput = true;
  } else if (initID == "28") {
    node.addOutput(new Output(id, varName, NUMBER_SOCKET));
    isOutput = true;
  } else if (initID == "29") {
    node.addOutput(new Output(id, varName, NUMBER2_SOCKET));
    isOutput = true;
  } else if (initID == "30") {
    node.addOutput(new Output(id, varName, COLORVEC_SOCKET));
    isOutput = true;
  } else if (initID == "31") {
    node.addOutput(new Output(id, varName, COLORVEC3_SOCKET));
    isOutput = true;
  } else if (initID == "32") {
    node.addOutput(new Output(id, varName, BOOLEAN_SOCKET));
    isOutput = true;
  } else if (initID == "33") {
    node.addOutput(new Output(id, varName, LUT_SOCKET));
    isOutput = true;
  } else if (initID == "34") {
    node.addOutput(new Output(id, varName, LUT3_SOCKET));
    isOutput = true;
  }

  return [isInput, isOutput];
};

export const dataTypeToSocketRef = (
  initID: string,
  node: Node,
  nodeData: any
) => {
  let isInput = false;
  let isOutput = false;

  let varName = nodeData.name;
  let id = nodeData.id.toString();

  if (initID == "1" || initID == "2" || initID == "6" || initID == "8") {
    node.addInput(new Input(id, varName, NUMBER_SOCKET));
    isInput = true;
  } else if (initID == "3" || initID == "9") {
    node.addInput(new Input(id, varName, NUMBER2_SOCKET));
    isInput = true;
  } else if (initID == "4") {
    node.addInput(new Input(id, varName, BOOLEAN_SOCKET));
    isInput = true;
  } else if (initID == "10") {
    node.addInput(new Input(id, varName, LUT_SOCKET));
    isInput = true;
  } else if (initID == "11") {
    node.addInput(new Input(id, varName, LUT3_SOCKET));
    isInput = true;
  } else if (initID == "12") {
    node.addInput(new Input(id, varName, COLORVEC_SOCKET));
    isInput = true;
  } else if (initID == "13") {
    node.addInput(new Input(id, varName, COLORVEC3_SOCKET));
    isInput = true;
  } else if (initID == "28") {
    node.addOutput(new Output(id, varName, NUMBER_SOCKET));
    isOutput = true;
  } else if (initID == "29") {
    node.addOutput(new Output(id, varName, NUMBER2_SOCKET));
    isOutput = true;
  } else if (initID == "30") {
    node.addOutput(new Output(id, varName, COLORVEC_SOCKET));
    isOutput = true;
  } else if (initID == "31") {
    node.addOutput(new Output(id, varName, COLORVEC3_SOCKET));
    isOutput = true;
  } else if (initID == "32") {
    node.addOutput(new Output(id, varName, BOOLEAN_SOCKET));
    isOutput = true;
  } else if (initID == "33") {
    node.addOutput(new Output(id, varName, LUT_SOCKET));
    isOutput = true;
  } else if (initID == "34") {
    node.addOutput(new Output(id, varName, LUT3_SOCKET));
    isOutput = true;
  }

  return [isInput, isOutput];
};
