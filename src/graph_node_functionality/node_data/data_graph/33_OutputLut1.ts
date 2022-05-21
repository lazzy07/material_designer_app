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
          id: "default",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
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
    parentId: "33",
    ioType: "output",
    operationType: "",
  },
});
