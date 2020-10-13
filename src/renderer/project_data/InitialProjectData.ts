import { Project } from "src/interfaces/Project";
import { v4 } from "uuid";

export const initialProjectData = (): Project => {
  const parentId = v4();
  return {
    id: v4(),
    filePath: "",
    fileName: "Untitled",
    packages: [
      {
        id: v4(),
        name: "Default Package",
        graphs: [
          {
            id: parentId,
            name: "Default graph",
            dataGraph: {
              parentId,
              data: {}
            },
            shaderGraph: {
              parentId,
              data: {}
            },
          }
        ],
      }
    ],
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
