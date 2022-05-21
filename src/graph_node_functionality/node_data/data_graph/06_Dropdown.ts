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
        id: "var_name",
        name: "Variable Name",
        data: "",
        dataType: "string",
        groups: {
          id: "1",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
      {
        id: "111",
        name: "Default Value",
        data: {},
        dataType: "number",
        groups: {
          id: "6111",
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
