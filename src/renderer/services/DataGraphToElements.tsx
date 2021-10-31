import { NodePropertyData } from "../../graph_node_functionality/interfaces/NodePropertyData";
import { DataGraph } from "../../interfaces/DataGraph";

export const dataGraphToElements = (
  dataGraph: DataGraph,
  deepGraph: boolean = false
) => {
  const isPrimitive = dataGraph.ioType;
  const elements: JSX.Element[] = [];

  if (isPrimitive) {
    const options = dataGraph.data as NodePropertyData<any>[];

    for (const i of options) {
      console.log(i);
    }
    return elements;
  } else {
    return dataGraphToElements((dataGraph.data as any).dataGraph, true);
  }
};
