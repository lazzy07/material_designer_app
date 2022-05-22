import { Graphs } from "../../../interfaces/Graphs";

export const Number2InputAndSlider = (): Graphs => ({
  id: "3",
  name: "Number2 Input & Slider",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "31",
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
        inputType: "input_and_slider",
        type: "",
      },
    },
    parentId: "3",
    ioType: "generator",
    operationType: "",
  },
});
