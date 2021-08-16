import { PackageElement } from "../../interfaces/PackageElement";
import { changeGraphData } from "../../redux/actions/GraphActions";
import { ProjectReducer } from "../../redux/reducers/ProjectReducer";
import { rStore } from "../renderer";
import { getPackageElementById } from "./GetPackageElement";

export const getCurrentProject = () => {
  const project = rStore.getState().project as ProjectReducer;
  return project;
};

export const getPackageElement = (
  id: string,
  packages: PackageElement[]
): PackageElement | null => {
  for (const pkg of packages) {
    if (pkg.id === id) {
      return pkg;
    } else {
      return getPackageElement(id, pkg.children);
    }
  }

  return null;
};

export const addNewPackage = (
  parentId: string,
  packageData: PackageElement
) => {
  const item = getPackageElementById(parentId);

  if (item) {
    if (item.contentType !== "graph") {
      const currentState = getCurrentProject().packages;

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
