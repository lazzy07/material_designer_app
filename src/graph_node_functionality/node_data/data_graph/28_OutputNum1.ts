import { v4 } from "uuid";
import { Graphs } from "../../../interfaces/Graphs";

export const OutputNum1: Graphs = {
  id: "28",
  name: "Out Num1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "281",
    data: [
      {
        id: "2811",
        name: "Default Value",
        data: 0,
        dataType: "number",
        groups: {
          id: "28111",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
      {
        id: "var_name",
        name: "Variable Name",
        data: v4(),
        dataType: "string",
        groups: {
          id: "28111",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
      {
        id: "id",
        name: "ID",
        data: v4(),
        dataType: "string",
        groups: {
          id: "28111",
          name: "Default",
        },
        inputType: "input",
        type: "",
        isHidden: true,
      },
    ],
    parentId: "28",
    ioType: "output",
    operationType: "",
  },
};
