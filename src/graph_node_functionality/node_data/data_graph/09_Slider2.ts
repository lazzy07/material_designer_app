import { Graphs } from "../../../interfaces/Graphs";

export const Slider2 = (): Graphs => ({
  id: "9",
  name: "Slider 2",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "91",
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
        data: [0, 0],
        dataType: "number2",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "slider",
        type: "",
      },
    },
    parentId: "9",
    ioType: "generator",
    operationType: "",
  },
});
