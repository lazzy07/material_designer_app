import { v4 } from "uuid";
import { Graphs } from "../../../interfaces/Graphs";

export const OutputCol1: Graphs = {
  id: "30",
  name: "Out Col1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "301",
    data: [
      {
        id: "3011",
        name: "Default Value",
        data: 0,
        dataType: "number2",
        groups: {
          id: "30111",
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
          id: "30111",
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
          id: "30111",
          name: "Default",
        },
        inputType: "input",
        type: "",
        isHidden: true,
      },
    ],
    parentId: "30",
    ioType: "output",
    operationType: "",
  },
};
