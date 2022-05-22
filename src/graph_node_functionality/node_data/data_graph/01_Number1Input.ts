import { Graphs } from "../../../interfaces/Graphs";

export const Number1Input = (): Graphs => ({
  id: "1",
  name: "Number1 Input",
  type: "dataGraph",
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
          id: "default",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
      default: {
        id: "default",
        name: "Default Value",
        data: 0,
        dataType: "number",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
    },
    parentId: "1",
    ioType: "generator",
    operationType: "",
  },
});
