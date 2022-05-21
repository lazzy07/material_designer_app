import { Graphs } from "../../../interfaces/Graphs";

export const Num2toNum1 = (): Graphs => ({
  id: "27",
  name: "Num2 to Num1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "271",
    data: [
      {
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
    ],
    parentId: "27",
    ioType: "process",
    operationType: "",
  },
});
