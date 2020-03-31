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
      wireframe: false,
      exposure: 1
    },
    description: "",
    currentGraph: "",
    textures: [],
    isCloud: false,
    isLocal: true,
    createdAt: Date.now(),
    modifiedAt: Date.now()
  };
};
