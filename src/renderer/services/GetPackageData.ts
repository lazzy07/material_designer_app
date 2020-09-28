import { Project } from "../../interfaces/Project";

export const getPackage = (project: Project, id: string) => {
  for (const i of project.packages) {
    if (i.id === id) {
      return i;
    }
  }

  return null;
};

export const getGraph = (project: Project, id: string) => {
  for (const i of project.packages) {
    for (const j of i.graphs) {
      if (j.id === id) {
        return j;
      }
    }
  }
  return null;
};
