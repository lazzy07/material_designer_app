import { GraphPackage } from "./GraphPackage";
import { Image } from "./Image";

export interface Project {
  id: string;
  filePath: string;
  fileName: string;
  description: string;
  packages: GraphPackage[];
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
}
