import { Graphs } from "../../../interfaces/Graphs";

export const DivideNumber = (): Graphs => ({
  id: "17",
  name: "Divide Number",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "171",
    data: [
      {
        id: "1711",
        name: "Default Value 1",
        data: 0,
        dataType: "number",
        groups: {
          id: "17111",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
      {
        id: "1712",
        name: "Default Value 2",
        data: 1,
        dataType: "number",
        groups: {
          id: "17111",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    ],
    parentId: "17",
    ioType: "process",
    operationType: "",
  },
});
