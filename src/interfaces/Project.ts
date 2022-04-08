import { Image } from "./Image";
import { PackageElement } from "./PackageElement";
import { ProjectOption } from "./ProjectOption";

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
  options: ProjectOption<any>[];
}
