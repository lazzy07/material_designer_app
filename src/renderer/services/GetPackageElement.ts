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
      parentId?: string;
    }
  | undefined => {
  const project = rStore.getState().project as ProjectReducer;

  if (project.id === id) {
    return { contentType: "project", graphType: "dataGraph" };
  }

  const data = searchPackages(project.packages, id, project.id);
  if (data) {
    return {
      contentType: data.package.contentType,
      graphType: (data.package as Graphs).type,
      parentId: data.parentId,
      data: data.package,
    };
  }

  return undefined;
};

const searchPackages = (
  packages: PackageElement[],
  id: string,
  parentId: string
): { package: PackageElement; parentId: string } | undefined => {
  for (const pkg of packages) {
    if (pkg.id === id) {
      return { package: pkg, parentId };
    }
    if (pkg.contentType === "graph") {
      const graph = pkg as Graphs;

      if (
        graph.kernelGraph!.id === id ||
        graph.shaderGraph!.id === id ||
        graph.dataGraph!.id === id
      ) {
        return { package: graph, parentId };
      }
    }
    if (pkg.children.length > 0) {
      const newpkg = searchPackages(pkg.children, id, pkg.id);
      if (newpkg) return newpkg;
    }
  }
};
