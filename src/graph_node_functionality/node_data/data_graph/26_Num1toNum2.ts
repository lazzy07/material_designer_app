import { Graphs } from "../../../interfaces/Graphs";

export const Num1toNum2 = (): Graphs => ({
  id: "26",
  name: "Num1 to Num2",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "261",
    data: {
      default: {
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
      default2: {
        id: "default2",
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
    },
    parentId: "26",
    ioType: "process",
    operationType: "",
  },
});
