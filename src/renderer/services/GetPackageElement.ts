import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import {
  PackageElement,
  PACKAGE_CONTENT_TYPE,
} from "../../interfaces/PackageElement";
import { ProjectReducer } from "../../redux/reducers/ProjectReducer";
import { rStore } from "../renderer";

export const getPackageElementById = (
  id: string
):
  | {
      contentType: PACKAGE_CONTENT_TYPE | "project";
      graphType: GRAPH_TYPES;
      data?: PackageElement;
    }
  | undefined => {
  const project = rStore.getState().project as ProjectReducer;

  if (project.id === id) {
    return { contentType: "project", graphType: "datagraph" };
  } else {
    const data = searchPackages(project.packages, id);

    if (data) {
      return {
        contentType: data.contentType,
        graphType: (data as Graphs).type,
        data,
      };
    }
  }
};

const searchPackages = (
  packages: PackageElement[],
  id: string
): PackageElement | undefined => {
  for (const pkg of packages) {
    if (pkg.id === id) {
      return pkg;
    } else {
      return searchPackages(pkg.children, id);
    }
  }
};
