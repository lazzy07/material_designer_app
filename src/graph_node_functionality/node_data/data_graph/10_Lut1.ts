import { Graphs } from "../../../interfaces/Graphs";

export const Lut1 = (): Graphs => ({
  id: "10",
  name: "Lut1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "101",
    data: [
      {
        id: "label",
        name: "Label Name",
        data: "Data",
        dataType: "string",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
      {
        id: "default",
        name: "Default Value",
        data: [
          {
            color: 0,
            pos: 0,
          },
          {
            color: 0,
            pos: 1,
          },
        ],
        dataType: "lut",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "lut",
        type: "",
      },
    ],
    parentId: "10",
    ioType: "generator",
    operationType: "",
  },
});
