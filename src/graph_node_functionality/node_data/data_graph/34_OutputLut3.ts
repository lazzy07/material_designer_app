import { Graphs } from "../../../interfaces/Graphs";

export const OutputLut3 = (): Graphs => ({
  id: "34",
  name: "Out Lut3",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "341",
    data: [
      {
        id: "var_name",
        name: "Variable Name",
        data: "",
        dataType: "string",
        groups: {
          id: "1",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
      {
        id: "3411",
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
          id: "34111",
          name: "Default",
        },
        inputType: "lut",
        type: "",
      },
    ],
    parentId: "34",
    ioType: "output",
    operationType: "",
  },
});
