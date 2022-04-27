import { Graphs } from "../../../interfaces/Graphs";

export const Num1toNum2 = (): Graphs => ({
  id: "26",
  name: "Num1 to Num2",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "261",
    data: [
      {
        id: "2611",
        name: "Default Value",
        data: 0,
        dataType: "number",
        groups: {
          id: "26111",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
      {
        id: "2612",
        name: "Default Value",
        data: 0,
        dataType: "number",
        groups: {
          id: "26111",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    ],
    parentId: "26",
    ioType: "process",
    operationType: "",
  },
});
