import { v4 } from "uuid";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { PackageElement } from "../../interfaces/PackageElement";
import { changeGraphData } from "../../redux/actions/GraphActions";
import { ProjectReducer } from "../../redux/reducers/ProjectReducer";
import { rStore } from "../renderer";
import { getPackageElementById } from "./GetPackageElement";

export const createPackage = (name: string = "Untitled"): PackageElement => {
  return {
    id: v4(),
    name,
    contentType: "package",
    children: [],
  };
};

export const createGraph = (
  type: GRAPH_TYPES,
  name: string = "Untitled"
): Graphs => {
  const id = v4();

  return {
    id,
    contentType: "graph",
    name,
    children: [],
    type,
    createdAt: new Date(),
    dataGraph: {
      id: v4(),
      data: {},
      parentId: id,
      createdAt: new Date(),
    },
    kernelGraph: {
      id: v4(),
      data: {},
      parentId: id,
      createdAt: new Date(),
    },
    shaderGraph: {
      id: v4(),
      data: {},
      parentId: id,
      createdAt: new Date(),
    },
  };
};

export const getCurrentProject = () => {
  const project = rStore.getState().project as ProjectReducer;
  return project;
};

export const getPackageElement = (
  id: string,
  packages: PackageElement[]
): PackageElement | undefined => {
  for (const pkg of packages) {
    if (pkg.id === id) {
      return pkg;
    }
    if (pkg.children.length > 0) {
      const newelem = getPackageElement(id, pkg.children);
      if (newelem) return newelem;
    }
  }
};

export const addNewPackage = (
  parentId: string,
  packageData: PackageElement,
  isRoot: boolean = false
) => {
  const item = getPackageElementById(parentId);
  if (item) {
    if (item.contentType !== "graph") {
      const currentState = getCurrentProject().packages;

      if (isRoot) {
        const packages = rStore.getState().project.packages;
        packages.push(packageData);
        rStore.dispatch(changeGraphData(packages));
        return;
      }

      const ref = getPackageElement(parentId, currentState);
      if (ref) {
        ref.children.push(packageData);
        rStore.dispatch(changeGraphData(currentState));
      }
    }
  }
};

export const addNewGraph = (
  parentId: string,
  graphData: Graphs,
  isRoot: boolean = false
) => {
  const item = getPackageElementById(parentId);

  if (item) {
    if (item.contentType !== "graph") {
      const currentState = getCurrentProject().packages;

      if (isRoot) {
        const packages = rStore.getState().project.packages;
        packages.push(graphData);
        rStore.dispatch(changeGraphData(packages));
        return;
      }

      const ref = getPackageElement(parentId, currentState);
      if (ref) {
        ref.children.push(graphData);
        rStore.dispatch(changeGraphData(currentState));
      }
    }
  }
};

export const deletePackage = (id: string) => {
  const elem = getPackageElementById(id);
  if (elem) {
    const project: ProjectReducer = rStore.getState().project;
    const packages = project.packages;

    if (project.id == elem.parentId) {
      const ref = packages;

      const children: PackageElement[] = [];
      for (const i of ref) {
        if (i.id !== elem.data!.id) {
          children.push(i);
        }
      }
      rStore.dispatch(changeGraphData(children));
    }

    const ref = getPackageElement(elem.parentId!, packages);
    const children: PackageElement[] = [];
    if (ref) {
      for (const i of ref!.children) {
        if (i.id !== elem.data!.id) {
          children.push(i);
        }
      }

      ref.children = children;
      rStore.dispatch(changeGraphData(packages));
    }
  }
};
