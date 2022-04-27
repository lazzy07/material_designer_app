import { Graphs } from "../../../interfaces/Graphs";

export const Lut3 = (): Graphs => ({
  id: "11",
  name: "Lut3",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "111",
    data: [
      {
        id: "1111",
        name: "Default Value",
        data: [
          {
            pos: 0,
            color: "#000000",
          },
          {
            pos: 1,
            color: "#ffffff",
          },
        ],
        dataType: "lut3",
        groups: {
          id: "11111",
          name: "Default",
        },
        inputType: "lut",
        type: "",
      },
    ],
    parentId: "11",
    ioType: "generator",
    operationType: "",
  },
});
