import { NodePropertyData } from "./../../graph_node_functionality/interfaces/NodePropertyData";
import { Graphs } from "./../../interfaces/Graphs";

export const getVarName = (graph: Graphs) => {
  const data: NodePropertyData<any>[] = graph.dataGraph
    ? (graph.dataGraph!.data as any)
    : [];

  for (const elem of data) {
    if (elem.id === "label") {
      return elem.data as string;
    }
  }

  return "undefined";
};
