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
        id: "511",
        name: "Default Value",
        data: "",
        dataType: "string",
        groups: {
          id: "5111",
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
