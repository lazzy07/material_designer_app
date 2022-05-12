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
    data: [
      {
        id: "2911",
        name: "Default Value",
        data: [0, 0],
        dataType: "number2",
        groups: {
          id: "29111",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
      {
        id: "var_name",
        name: "Variable Name",
        data: "",
        dataType: "string",
        groups: {
          id: "29111",
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
          id: "29111",
          name: "Default",
        },
        inputType: "input",
        type: "",
        isHidden: true,
      },
    ],
    parentId: "29",
    ioType: "output",
    operationType: "",
  },
});
