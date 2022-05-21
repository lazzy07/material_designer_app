import { v4 } from "uuid";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import {
  PackageElement,
  PackageTreeElement,
} from "../../interfaces/PackageElement";
import { changeGraphData } from "../../redux/actions/GraphActions";
import { ProjectReducer } from "../../redux/reducers/ProjectReducer";
import { EDITOR_VERSION } from "../constants/Versions";
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
      data: { id: "materialdesigner@" + EDITOR_VERSION, nodes: {} },
      parentId: id,
      createdAt: new Date(),
      isSecondary: true,
    },
    kernelGraph: {
      id: v4(),
      data: {
        kernel: "//Implement your kernel functionality here\n",
        functions: "//Implement your helper functions here\n",
      },
      parentId: id,
      createdAt: new Date(),
      isSecondary: true,
    },
    shaderGraph: {
      id: v4(),
      data: { id: "materialdesigner@" + EDITOR_VERSION, nodes: {} },
      parentId: id,
      createdAt: new Date(),
      isSecondary: true,
    },
  };
};

export const getCurrentProject = () => {
  const project = rStore.getState().project as ProjectReducer;
  return project;
};

export const getPackageElement = (
  id: string,
  tree: PackageTreeElement[],
  packages: { [id: string]: PackageElement }
): PackageElement | undefined => {
  for (const i of tree) {
    let pkg = packages[i.id];
    if (pkg.id === id) {
      return pkg;
    }
    if (pkg.children.length > 0) {
      const newelem = getPackageElement(id, i.children, packages);
      if (newelem) return newelem;
    }
  }
};

export const getPackageTreeElement = (
  id: string,
  tree: PackageTreeElement[]
): PackageTreeElement | undefined => {
  for (const i of tree) {
    if (i.id === id) {
      return i;
    }
    if (i.children.length > 0) {
      const newelem = getPackageTreeElement(id, i.children);
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
      const tree = getCurrentProject().tree;
      const packages = getCurrentProject().packages;

      if (isRoot) {
        const tree = getCurrentProject().tree;
        tree.push({ id: packageData.id, children: [] });
        rStore.dispatch(
          changeGraphData(tree, { ...packages, [packageData.id]: packageData })
        );
        return;
      }

      const ref = getPackageTreeElement(parentId, tree);
      if (ref) {
        ref.children.push({ id: packageData.id, children: [] });
        rStore.dispatch(
          changeGraphData(tree, { ...packages, [packageData.id]: packageData })
        );
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
      const currentState = getCurrentProject().tree;
      const packages = getCurrentProject().packages;

      if (isRoot) {
        const tree = [...currentState];
        tree.push({ id: graphData.id, children: [] });
        rStore.dispatch(
          changeGraphData(tree, { ...packages, [graphData.id]: graphData })
        );
        return;
      }

      const ref = getPackageTreeElement(parentId, currentState);
      if (ref) {
        ref.children.push({ id: graphData.id, children: [] });
        rStore.dispatch(
          changeGraphData(currentState, {
            ...packages,
            [graphData.id]: graphData,
          })
        );
      }
    }
  }
};

export const deletePackage = (id: string) => {
  const elem = getPackageElementById(id);
  if (elem) {
    const project = getCurrentProject();
    const tree = project.tree;
    const packages = project.packages;

    if (project.id == elem.parentId) {
      const ref = tree;

      const children: PackageTreeElement[] = [];
      for (const i of ref) {
        if (i.id !== elem.data!.id) {
          children.push(i);
        } else {
          for (let j of i.children) {
            delete packages[j.id];
          }
          delete packages[i.id];
        }
      }
      rStore.dispatch(changeGraphData(children, packages));
    }

    const ref = getPackageTreeElement(elem.parentId!, tree);
    const children: PackageTreeElement[] = [];
    if (ref) {
      for (const i of ref!.children) {
        if (i.id !== elem.data!.id) {
          children.push(i);
        } else {
          for (let j of i.children) {
            delete packages[j.id];
          }
          delete packages[i.id];
        }
      }

      ref.children = children;
      rStore.dispatch(changeGraphData(tree, packages));
    }
  }
};

export const editPackageName = (id: string, name: string) => {
  const project: ProjectReducer = getCurrentProject();
  const packages = project.packages;
  packages[id].name = name;
};
