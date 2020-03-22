import { Project } from "src/interfaces/Project";

export const InitialProjectData = (): Project => {
  return {
    graphs: [],
    preview: {
      shape: "cube",
      subdivision: 100,
      wireframe: false
    },
    textures: []
  };
};
