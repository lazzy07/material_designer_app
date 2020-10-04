import { NodeData } from "../interfaces/NodeData";
import fs from "fs";

export const readNodes = (filePath: string): Promise<NodeData> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const nodeData = JSON.parse(data.toString());
          return nodeData;
        } catch (err) {
          reject(err);
        }
      }
    });
  });
};

export const readDefaultNodes = () => {};
