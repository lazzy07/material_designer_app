import { Graphs } from "../../../interfaces/Graphs";

export const Button = (): Graphs => ({
  id: "5",
  name: "Button",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "51",
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
        data: "",
        dataType: "string",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
    ],
    parentId: "5",
    ioType: "generator",
    operationType: "",
  },
});
