import fs from "fs";
import Path from "path";

export const getLocalAssetPath = (
  id: string,
  path: string
): Promise<string> => {
  const pathdata = Path.parse(path);
  return new Promise((resolve, reject) => {
    fs.readdir(pathdata.dir, (err, files) => {
      if (err) {
        return reject(err);
      } else {
        for (const i of files) {
          const data = i.split(".");
          const [lastItem] = data.slice(-1);
          if (data[0] === id) {
            if (lastItem !== "preview") {
              return resolve(Path.join(pathdata.dir, i));
            }
          }
        }
      }
    });
  });
};
