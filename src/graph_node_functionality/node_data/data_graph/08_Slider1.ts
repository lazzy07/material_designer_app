import { Graphs } from "../../../interfaces/Graphs";

export const Slider1 = (): Graphs => ({
  id: "8",
  name: "Slider 1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "81",
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
        data: 0,
        dataType: "number",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "slider",
        type: "",
      },
    },
    parentId: "8",
    ioType: "generator",
    operationType: "",
  },
});
