import { GraphPackage } from "./GraphPackage";
import { Graphs } from "./Graphs";
import { Image } from "./Image";

export interface Project {
  id: string;
  filePath: string;
  fileName: string;
  currentGraph: string;
  description: string;
  graphs: GraphPackage[];
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
