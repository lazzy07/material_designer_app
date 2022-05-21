import { Graphs } from "../../../interfaces/Graphs";

export const Button = (): Graphs => ({
  id: "4",
  name: "Button",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "41",
    data: [
      {
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
      {
        id: "default",
        name: "Default Value",
        data: false,
        dataType: "boolean",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "button",
        type: "",
      },
    ],
    parentId: "4",
    ioType: "generator",
    operationType: "",
  },
});
