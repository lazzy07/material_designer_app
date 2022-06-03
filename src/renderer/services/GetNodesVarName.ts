import { NodePropertyData } from "./../../graph_node_functionality/interfaces/NodePropertyData";
import { Graphs } from "./../../interfaces/Graphs";

export const getVarName = (graph: Graphs) => {
  const data: { [id: string]: NodePropertyData<any> } = graph.dataGraph
    ? (graph.dataGraph!.data as any)
    : [];

  return data["label"] ? data["label"].data : "Undefined";
};
