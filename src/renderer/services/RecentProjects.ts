import { ProjectFile } from "../../interfaces/ProjectFile";

export default class RecentProjects {
  private static data: ProjectFile[] = [];

  static initSavedData = () => {
    const strData = localStorage.getItem("recentProjects");

    if (strData) {
      RecentProjects.data = JSON.parse(strData);
    }
  };

  static addData = (project: ProjectFile) => {
    RecentProjects.initSavedData();
    const data = RecentProjects.data;
    if (data.length > 20) {
      const newData = [project, ...data.slice(0, 19)];
      RecentProjects.data = newData;
    } else {
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
