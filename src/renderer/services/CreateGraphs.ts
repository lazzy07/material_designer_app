import { GraphPackage } from "../../interfaces/GraphPackage";
import { v4 } from "uuid";
import { Graphs } from "../../interfaces/Graphs";
import { Project } from "../../interfaces/Project";

export const createPackage = (packageName = "Untitled"): GraphPackage => {
  return {
    id: v4(),
    name: packageName,
    graphs: [],
  };
};

export const createGraph = (graphsName = "Untitled"): Graphs => {
  return {
    id: v4(),
    name: graphsName,
    shaderGraph: {},
    dataGraph: {},
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
  for (const i of project.packages) {
    if (pkg.id === i.id) {
      pkg.graphs.push(graphs);
    }
  }

  return [...project.packages];
};
