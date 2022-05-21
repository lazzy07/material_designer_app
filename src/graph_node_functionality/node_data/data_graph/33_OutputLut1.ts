import { Graphs } from "../../../interfaces/Graphs";

export const OutputLut1 = (): Graphs => ({
  id: "33",
  name: "Out Lut1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "331",
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
        id: "3311",
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
          id: "33111",
          name: "Default",
        },
        inputType: "lut",
        type: "",
      },
    ],
    parentId: "33",
    ioType: "output",
    operationType: "",
  },
});
