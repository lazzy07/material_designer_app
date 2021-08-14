import { GraphPackage } from "../../interfaces/GraphPackage";
import { v4 } from "uuid";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { Project } from "../../interfaces/Project";

export const createPackage = (packageName = "Untitled"): GraphPackage => {
  return {
    id: v4(),
    name: packageName,
    graphs: [],
  };
};

export const createGraph = (
  graphsName = "Untitled",
  type: GRAPH_TYPES = "shadergraph"
): Graphs => {
  const parentId = v4();
  return {
    id: parentId,
    name: graphsName,
    type: type,
    shaderGraph: { parentId, data: {} },
    dataGraph: { parentId, data: {} },
    kernelGraph: { parentId, data: {} },
  };
};

export const injectPackage = (
  project: Project,
  pkg: GraphPackage
): GraphPackage[] => {
  return [...project.packages, pkg];
};

export const injectGraph = (
  project: Project,
  pkg: GraphPackage,
  graphs: Graphs
) => {
  const { packages } = project;
  let newPackages: GraphPackage[] = [];
  for (const i of packages) {
    if (pkg.id === i.id) {
      i.graphs.push(graphs);
    }
    newPackages.push(i);
  }

  return newPackages;
};
