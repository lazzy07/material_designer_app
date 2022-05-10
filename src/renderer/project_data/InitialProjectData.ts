import { PackageTreeElement } from "./../../interfaces/PackageElement";
import { Project } from "src/interfaces/Project";
import { v4 } from "uuid";

export const initialProjectData = (): Project => {
  return {
    id: v4(),
    filePath: "",
    fileName: "Untitled",
    tree: [],
    packages: {},
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
    settings: [
      {
        id: "bit_type",
        groups: {
          id: "1",
          name: "Default",
        },
        dataType: "number",
        inputType: "dropdown",
        data: {
          options: [
            {
              value: "0",
              label: "8-Bit",
            },
            {
              value: "1",
              label: "16-Bit",
            },
            {
              value: "2",
              label: "32-bit",
            },
          ],
          value: "0",
        },
        name: "Bit Type",
        type: "",
      },
      {
        id: "resolution_h",
        groups: {
          id: "1",
          name: "Default",
        },
        dataType: "number",
        inputType: "input",
        data: 1024,
        name: "Resolution Width",
        type: "",
      },
      {
        id: "resolution_w",
        groups: {
          id: "1",
          name: "Default",
        },
        dataType: "number",
        inputType: "input",
        data: 1024,
        name: "Resolution Width",
        type: "",
      },
    ],
  };
};
