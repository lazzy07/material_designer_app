import { Graphs } from "../../../interfaces/Graphs";

export const BooltoNum1 = (): Graphs => ({
  id: "24",
  name: "Bool to Num1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "241",
    data: [
      {
        id: "default",
        name: "Default Value",
        data: false,
        dataType: "boolean",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "button",
        type: "",
      },
    ],
    parentId: "24",
    ioType: "process",
    operationType: "",
  },
});
