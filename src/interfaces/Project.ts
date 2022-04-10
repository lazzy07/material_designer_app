import { Image } from "./Image";
import { PackageElement } from "./PackageElement";
import { ProjectSetting } from "./ProjectSetting";

export interface Project {
  id: string;
  filePath: string;
  fileName: string;
  description: string;
  packages: PackageElement[];
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
