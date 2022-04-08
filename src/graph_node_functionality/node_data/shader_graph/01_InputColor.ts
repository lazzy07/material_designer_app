import { Graphs } from "../../../interfaces/Graphs";

export const InputColor: Graphs = {
  id: "1",
  name: "Color Input",
  type: "shaderGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "11",
    data: [
      {
        id: "resolution_type",
        name: "Resolution Type",
        data: {
          options: [
            {
              value: 0,
              label: "Use Global Settings",
            },
            {
              value: 1,
              label: "Custom",
            },
          ],
          value: 0,
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
    parentId: "1",
    ioType: "generator",
    operationType: "color",
  },
};
