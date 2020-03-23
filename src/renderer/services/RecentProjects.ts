import { ProjectFile } from "../../interfaces/ProjectFile";
import fs from "fs";

export default class RecentProjects {
  private static data: ProjectFile[] = [];

  static initSavedData = () => {
    const strData = localStorage.getItem("recentProjects");

    if (strData) {
      const data: ProjectFile[] = JSON.parse(strData);
      const availale: ProjectFile[] = [];
      for (let i of data) {
        if (fs.existsSync(i.filePath)) {
          availale.push(i);
        }
      }

      RecentProjects.data = availale;
    }
  };

  static addData = (project: ProjectFile) => {
    RecentProjects.initSavedData();
    const data = RecentProjects.data;
    if (data.length > 20) {
      let isExists: ProjectFile | undefined = undefined;

      for (let i = 0; i < data.length; i++) {
        if (data[i].filePath === project.filePath) {
          data.splice(i, 1);
        }
      }

      const newData = [project, ...data.slice(0, 19)];
      RecentProjects.data = newData;
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].filePath === project.filePath) {
          data.splice(i, 1);
        }
      }

      RecentProjects.data = [project, ...RecentProjects.data];
    }
  };

  static saveData = () => {
    const strData = JSON.stringify(RecentProjects.data);
    localStorage.setItem("recentProjects", strData);
  };

  static getData = () => {
    return RecentProjects.data;
  };
}
