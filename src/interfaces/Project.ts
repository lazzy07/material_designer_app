import { Image } from "./Image";

export interface Project {
  id: string;
  filePath: string;
  fileName: string;
  currentGraph: string;
  description: string;
  graphs: any[];
  textures: Image[];
  preview: {
    subdivision: number;
    shape: string;
    wireframe: boolean;
    exposure: number;
  };
  modifiedAt: number;
  createdAt: number;
}
