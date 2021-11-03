import { NodePropertyData } from "../../graph_node_functionality/interfaces/NodePropertyData";
import { DataGraph } from "../../interfaces/DataGraph";
import { Graphs } from "../../interfaces/Graphs";
import { Data } from "../../packages/rete-1.4.4/core/data";
import { renderDatagraphElement } from "./RenderDataGraphElements";

export const dataGraphToElements = (dataGraph: DataGraph) => {
  const isPrimitive = dataGraph.ioType;
  const elements: JSX.Element[] = [];

  if (isPrimitive) {
    //Primitive type node has been queried
    const options = dataGraph.data as NodePropertyData<any>[];

    for (const i of options) {
      return renderDatagraphElement(i);
    }
  } else {
    //find all the generator types in the graph and render those data
    const data = dataGraph.data as Data;
    const nodes = data.nodes;

    const keys = Object.keys(nodes);

    for (const i of keys) {
      const data = nodes[i].data as any as Graphs;

      //TODO:: Handle graph data
    }
  }

  return elements;
};
