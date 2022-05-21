import { Graphs } from "../../../interfaces/Graphs";

export const Col1toNum1 = (): Graphs => ({
  id: "20",
  name: "Col1 to Num1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "201",
    data: [
      {
        id: "default",
        name: "Default Value",
        data: 0,
        dataType: "colorvec",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "colorpicker",
        type: "",
      },
    ],
    parentId: "20",
    ioType: "process",
    operationType: "",
  },
});
