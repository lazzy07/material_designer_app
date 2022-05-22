import { v4 } from "uuid";
import { Graphs } from "../../../interfaces/Graphs";

export const OutputNum2 = (): Graphs => ({
  id: "29",
  name: "Out Num2",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "291",
    data: {
      var_name: {
        id: "var_name",
        name: "Variable Name",
        data: "",
        dataType: "string",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
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
        data: [0, 0],
        dataType: "number2",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    },
    parentId: "29",
    ioType: "output",
    operationType: "",
  },
});
