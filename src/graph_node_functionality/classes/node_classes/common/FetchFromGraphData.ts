import { Graphs, GRAPH_TYPES } from "../../../../interfaces/Graphs";
import { MaterialGraph } from "../../../../interfaces/MaterialGraph";

export const fetchFromGraphData = (
  graphType: GRAPH_TYPES,
  graph: Graphs
): MaterialGraph => {
  switch (graphType) {
    case "shaderGraph":
      return graph.shaderGraph!;
    case "dataGraph":
      return graph.dataGraph!;

    default:
      return graph.kernelGraph!;
  }
};
