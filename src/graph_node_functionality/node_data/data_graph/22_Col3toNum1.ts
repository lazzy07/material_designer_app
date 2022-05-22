import { Graphs } from "../../../interfaces/Graphs";

export const Col3toNum1 = (): Graphs => ({
  id: "22",
  name: "Col3 to Num1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "221",
    data: {
      default: {
        id: "default",
        name: "Default Value",
        data: "#ffffff",
        dataType: "colorvec3",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "colorpicker",
        type: "",
      },
    },
    parentId: "22",
    ioType: "process",
    operationType: "",
  },
});
