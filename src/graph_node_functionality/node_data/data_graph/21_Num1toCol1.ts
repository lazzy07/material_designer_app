import { Graphs } from "../../../interfaces/Graphs";

export const Num1toCol1 = (): Graphs => ({
  id: "21",
  name: "Num1 to Col1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "211",
    data: [
      {
        id: "2111",
        name: "Default Value",
        data: 0,
        dataType: "number",
        groups: {
          id: "21111",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    ],
    parentId: "21",
    ioType: "process",
    operationType: "",
  },
});
