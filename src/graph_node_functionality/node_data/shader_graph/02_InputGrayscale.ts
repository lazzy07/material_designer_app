import { Graphs } from "../../../interfaces/Graphs";

export const InputGrayscale = (): Graphs => ({
  id: "2",
  name: "Grayscale Input",
  type: "shaderGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "22",
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
    parentId: "2",
    ioType: "generator",
    operationType: "grayscale",
  },
});
