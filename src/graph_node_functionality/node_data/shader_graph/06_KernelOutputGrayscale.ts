import { Graphs } from "../../../interfaces/Graphs";

export const KernelOutputGrayscale: Graphs = {
  id: "6",
  name: "Kernel Grayscale Output",
  type: "shaderGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "66",
    data: [
      {
        id: "resolution_type",
        name: "Resolution Type",
        data: {
          options: [
            {
              value: "0",
              label: "Use Global Settings",
            },
            {
              value: "1",
              label: "Custom",
            },
          ],
          value: "0",
        },
        dataType: "number",
        groups: {
          id: "111",
          name: "Default",
        },
        inputType: "dropdown",
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
        name: "Resolution Height",
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
    parentId: "6",
    ioType: "process",
    operationType: "grayscale",
  },
};
