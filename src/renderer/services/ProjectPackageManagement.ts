import { v4 } from "uuid";
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

export const addNewGraph = (parentId: string) => {};

export const deletePackage = () => {};

export const deleteGraph = () => {};
