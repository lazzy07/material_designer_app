import { Graphs } from "../../../interfaces/Graphs";

export const Slider1 = (): Graphs => ({
  id: "8",
  name: "Slider 1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "81",
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
          id: "8111",
          name: "Default",
        },
        inputType: "slider",
        type: "",
      },
    ],
    parentId: "8",
    ioType: "generator",
    operationType: "",
  },
});
