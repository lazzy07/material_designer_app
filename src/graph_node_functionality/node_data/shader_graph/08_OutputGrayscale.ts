import { Graphs } from "../../../interfaces/Graphs";

export const OutputGrayscale = (): Graphs => ({
  id: "8",
  name: "Grayscale Output",
  type: "shaderGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "88",
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
    parentId: "8",
    ioType: "output",
    operationType: "grayscale",
  },
});
