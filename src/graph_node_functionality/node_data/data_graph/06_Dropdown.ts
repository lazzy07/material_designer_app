import { Graphs } from "../../../interfaces/Graphs";

export const Dropdown = (): Graphs => ({
  id: "6",
  name: "Dropdown",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "61",
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
        data: {},
        dataType: "number",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "dropdown",
        type: "",
      },
    ],
    parentId: "6",
    ioType: "generator",
    operationType: "",
  },
});
