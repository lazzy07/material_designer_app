import { Graphs } from "../../../interfaces/Graphs";

export const InputColor = (): Graphs => ({
  id: "1",
  name: "Color Input",
  type: "shaderGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "11",
    data: {
      label: {
        id: "label",
        name: "Label Name",
        data: "Data",
        dataType: "string",
        groups: {
          id: "1",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
    },
    parentId: "1",
    ioType: "generator",
    operationType: "color",
  },
});
