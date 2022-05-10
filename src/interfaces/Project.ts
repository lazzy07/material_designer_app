import { Image } from "./Image";
import { PackageElement, PackageTreeElement } from "./PackageElement";
import { ProjectSetting } from "./ProjectSetting";

export interface Project {
  id: string;
  filePath: string;
  fileName: string;
  description: string;
  tree: PackageTreeElement[];
  packages: { [id: string]: PackageElement };
  textures: Image[];
  preview: {
    subdivision: number;
    shape: string;
    wireframe: boolean;
    exposure: number;
  };
  isCloud: boolean;
  isLocal: boolean;
  modifiedAt: number;
  createdAt: number;
  settings: ProjectSetting<any>[];
}
