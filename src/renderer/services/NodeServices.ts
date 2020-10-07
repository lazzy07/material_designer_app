import { NodeData } from "../../interfaces/NodeData";
import { getAllFiles, readJsonFile } from "./FileServices";
import Path from "path";

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
