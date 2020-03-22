import { Project } from "src/interfaces/Project";

export const initialProjectData = (): Project => {
  return {
    id: "",
    filePath: "",
    fileName: "",
    graphs: [],
    preview: {
      shape: "cube",
      subdivision: 100,
      wireframe: false
    },
    description: "",
    currentGraph: "",
    textures: [],
    createdAt: Date.now(),
    modifiedAt: Date.now()
  };
};
