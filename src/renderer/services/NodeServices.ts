import { NodeData } from "../../interfaces/NodeData";
import { getAllFiles, readJsonFile } from "./FileServices";
import Path from "path";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { Data } from "../../packages/rete-1.4.4/core/data";

export const getAllNodes = (path: string): Promise<NodeData[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const files = await getAllFiles(path);
      let nodeData: NodeData[] = [];

      for (const file of files) {
        const filePath = Path.join(path, file);
        const data: NodeData = await readJsonFile(filePath);
        nodeData.push(data);
      }

      resolve(nodeData);
    } catch (err) {
      reject(err);
    }
  });
};

export const getSelectedNode = (
  selectedGraph: Graphs | null,
  selectedGraphType: GRAPH_TYPES | null,
  selectedNode: number
) => {
  if (selectedGraph && selectedGraphType) {
    const sGraph = selectedGraph[selectedGraphType];
    const graphData = sGraph!.data as Data;

    if (graphData) {
      if (graphData.nodes) {
        return graphData.nodes[selectedNode];
      }
    }
  }
  return null;
};
