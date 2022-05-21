import { NodePropertyData } from "../../graph_node_functionality/interfaces/NodePropertyData";
import { DataGraph } from "../../interfaces/DataGraph";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { Data, NodeData, NodesData } from "../../packages/rete-1.4.4/core/data";
import { renderDatagraphElement } from "./RenderDataGraphElements";

export const nodePropertiesToElements = (
  node: NodeData,
  graph: Graphs,
  selectedGraphType: GRAPH_TYPES
) => {
  const nodeDataGraph = node.data.dataGraph as DataGraph;
  const isPrimitive = !nodeDataGraph.isSecondary;
  const elements: JSX.Element[] = [];

  if (isPrimitive) {
    //Primitive type node has been queried
    const options = nodeDataGraph.data as NodePropertyData<any>[];
    let j = 0;
    for (const i of options) {
      const elem = renderDatagraphElement(i, j, graph, node, selectedGraphType);
      elements.push(elem);
      j++;
    }
  } else {
    //TODO:: find all the generator types in the graph and render those data
    const nodeData = (node.data as any).dataGraph.data as NodesData;
    const nodes = Object.values(nodeData);
    const elements: JSX.Element[] = [];

    if (nodes) {
      let j = 0;
      for (const node of nodes) {
        const dataGraph = (node.data as any).dataGraph as DataGraph;
        const isPrimitive = !dataGraph.isSecondary;

        if (isPrimitive) {
          // const elem = renderDatagraphElement(, )
        }
        // const elem = renderDatagraphElement(i, j, graph, node, selectedGraphType);
      }
    }
  }

  return elements;
};
