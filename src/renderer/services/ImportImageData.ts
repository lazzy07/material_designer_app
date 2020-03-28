import fs from "fs";
import { compressImage } from "./ImageCompressor";
export type ImportTypes = "texture" | "hdri" | "node";

/**
 * This is app only version of importing data
 * @param path path of the image/node need to import
 * @param type type of the import
 */
export const importImageToApp = (path: string, type: ImportTypes) => {
  return new Promise((resolve, reject) => {
    fs.access(path, err => {
      if (err) {
        //TODO:: Handle error
        console.log(err);
      } else {
        fs.readFile(path, (err, data) => {
          if (err) {
            //TODO:: Handle error
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  });
};
