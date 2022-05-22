import { Graphs } from "../../../interfaces/Graphs";

export const OutputColor = (): Graphs => ({
  id: "7",
  name: "Color Output",
  type: "shaderGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "77",
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
    parentId: "7",
    ioType: "output",
    operationType: "color",
  },
});
