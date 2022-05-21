import { v4 } from "uuid";
import { Graphs } from "../../../interfaces/Graphs";

export const OutputNum1 = (): Graphs => ({
  id: "28",
  name: "Out Num1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "281",
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
        data: 0,
        dataType: "number",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    ],
    parentId: "28",
    ioType: "output",
    operationType: "",
  },
});
