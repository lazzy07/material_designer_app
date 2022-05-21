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
        id: "411",
        name: "Default Value",
        data: false,
        dataType: "boolean",
        groups: {
          id: "4111",
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
