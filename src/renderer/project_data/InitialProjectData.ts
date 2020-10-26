import { Project } from "src/interfaces/Project";
import { v4 } from "uuid";

export const initialProjectData = (): Project => {
  return {
    id: v4(),
    filePath: "",
    fileName: "Untitled",
    packages: [],
    preview: {
      shape: "cube",
      subdivision: 100,
      wireframe: false,
      exposure: 1,
    },
    description: "",
    textures: [],
    isCloud: false,
    isLocal: true,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  };
};
