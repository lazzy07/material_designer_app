import { NodePropertyData } from "../../graph_node_functionality/interfaces/NodePropertyData";
import { DataGraph } from "../../interfaces/DataGraph";
import { Graphs } from "../../interfaces/Graphs";
import { Data, NodeData } from "../../packages/rete-1.4.4/core/data";
import { renderDatagraphElement } from "./RenderDataGraphElements";

export const nodePropertiesToElements = (node: NodeData, graph: Graphs) => {
  const nodeDataGraph = node.data.dataGraph as DataGraph;
  const isPrimitive = nodeDataGraph.ioType;
  const elements: JSX.Element[] = [];

  if (isPrimitive) {
    //Primitive type node has been queried
    const options = nodeDataGraph.data as NodePropertyData<any>[];
    let j = 0;
    for (const i of options) {
      const elem = renderDatagraphElement(i, j, graph, node);
      elements.push(elem);
      j++;
    }
  } else {
    //find all the generator types in the graph and render those data
    // const data: Data = node.data as any;
    // const nodes = data.nodes;
    // const keys = Object.keys(nodes);
    // for (const i of keys) {
    //   const data = nodes[i].data as any as Graphs;
    //   //TODO:: Handle graph data
    // }
  }

  return elements;
};
