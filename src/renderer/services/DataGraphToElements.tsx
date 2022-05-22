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
    const options = nodeDataGraph.data as {
      [id: string]: NodePropertyData<any>;
    };
    let j = 0;
    for (const i of Object.values(options)) {
      const elem = renderDatagraphElement(i, j, graph, node, selectedGraphType);
      elements.push(elem);
      j++;
    }
  } else {
    //TODO:: find all the generator types in the graph and render those data
    const nodeData = (node.data as any).dataGraph.data.nodes as NodesData;
    const nodes = Object.values(nodeData);

    if (nodes) {
      for (const elem of nodes) {
        if (elem) {
          const dataGraph = (elem.data as unknown as Graphs).dataGraph;
          const isPrimitive = !dataGraph?.isSecondary;

          if (isPrimitive) {
            const options = dataGraph!.data as {
              [id: string]: NodePropertyData<any>;
            };
            let j = 0;

            for (const i of Object.values(options)) {
              if (i.id === "default") {
                const elem = renderDatagraphElement(
                  i,
                  j,
                  graph,
                  node,
                  selectedGraphType
                );
                elements.push(elem);
              }
              j++;
            }
          }
        }
      }
    }
  }

  return elements;
};
