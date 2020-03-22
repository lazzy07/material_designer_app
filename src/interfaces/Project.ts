import { Image } from "./Image";

export interface Project {
  graphs: any[];
  textures: Image[];
  preview: {
    subdivision: number;
    shape: string;
    wireframe: boolean;
  };
}
