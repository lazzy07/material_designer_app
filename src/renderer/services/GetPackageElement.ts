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
  }

  const data = searchPackages(project.packages, id);
  if (data) {
    return {
      contentType: data.contentType,
      graphType: (data as Graphs).type,
      data,
    };
  }

  return undefined;
};

const searchPackages = (
  packages: PackageElement[],
  id: string
): PackageElement | undefined => {
  for (const pkg of packages) {
    if (pkg.id === id) {
      return pkg;
    }
    if (pkg.children.length > 0) {
      const newpkg = searchPackages(pkg.children, id);
      if (newpkg) return newpkg;
    }
  }
};
