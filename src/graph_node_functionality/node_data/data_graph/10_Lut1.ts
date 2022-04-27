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
        id: "1011",
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
          id: "10111",
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
