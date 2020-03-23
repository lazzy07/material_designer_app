import fs from "fs";
import { openProject as op } from "../../redux/actions/ProjectActions";
import RecentProjects from "./RecentProjects";
import { rStore } from "../renderer";
import path from "path";

export const openProjectFromFile = (filePath: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        //TODO:: Handle error
        console.log(err);
        reject(err);
      } else {
        const jsonData = JSON.parse(data.toString());
        rStore.dispatch(op(jsonData));
        RecentProjects.addData({
          description: jsonData.description,
          filePath: path.join(jsonData.filePath, jsonData.fileName),
          type: "local",
          lastModified: jsonData.createdAt
        });
        RecentProjects.saveData();
        resolve(jsonData);
      }
    });
  });
};
