import { v4 } from "uuid";
import { Graphs } from "../../../interfaces/Graphs";

export const KernelInputGrayscale: Graphs = {
  id: "4",
  name: "Kernel Grayscale Input",
  type: "shaderGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "44",
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
      {
        id: "var_name",
        name: "Variable Name",
        data: v4(),
        dataType: "string",
        groups: {
          id: "1",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
    ],
    parentId: "4",
    ioType: "process",
    operationType: "grayscale",
  },
};
