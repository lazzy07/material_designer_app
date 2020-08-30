import fs from "fs";
import path from "path";

export const getAllFiles = (filePath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(files);
      }
    });
  });
};

export const getPreviewFiles = (filePath: string): Promise<string[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const files = await getAllFiles(filePath);
      let fileList: string[] = [];

      for (let i of files) {
        const ext = path.parse(i).ext;

        if (ext === ".preview") {
          fileList.push(i);
        }
      }

      resolve(fileList);
    } catch (err) {
      reject(err);
    }
  });
};

export const readJsonFile = <T>(filePath: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...JSON.parse(data.toString()), filePath, isLocal: true });
      }
    });
  });
};
