import { Graphs } from "../../../interfaces/Graphs";

export const Num1toBool = (): Graphs => ({
  id: "25",
  name: "Num1 to Bool",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "251",
    data: [
      {
        id: "2511",
        name: "Default Value",
        data: 0,
        dataType: "number",
        groups: {
          id: "25111",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    ],
    parentId: "25",
    ioType: "process",
    operationType: "",
  },
});
