import fs from "fs";
import { openProject as op } from "../../redux/actions/ProjectActions";
import RecentProjects from "./RecentProjects";
import { rStore } from "../renderer";

export const openProjectFromFile = (filePath: string) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      //TODO:: Handle error
      console.log(err);
    } else {
      const jsonData = JSON.parse(data.toString());
      rStore.dispatch(op(jsonData));
      RecentProjects.addData(jsonData);
      RecentProjects.saveData();
    }
  });
};
