import { Graphs } from "../../../interfaces/Graphs";

export const Number1Input = (): Graphs => ({
  id: "1",
  name: "Number1 Input",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "11",
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
        data: 0,
        dataType: "number",
        groups: {
          id: "1111",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
    ],
    parentId: "1",
    ioType: "generator",
    operationType: "",
  },
});
