import { Graphs } from "../../../interfaces/Graphs";

export const Lut3 = (): Graphs => ({
  id: "11",
  name: "Lut3",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "111",
    data: {
      label: {
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
      default: {
        id: "default",
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
          id: "default",
          name: "Default",
        },
        inputType: "lut",
        type: "",
      },
    },
    parentId: "11",
    ioType: "generator",
    operationType: "",
  },
});
