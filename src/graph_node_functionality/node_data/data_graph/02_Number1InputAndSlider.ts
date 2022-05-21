import { Graphs } from "../../../interfaces/Graphs";

export const Number1InputAndSlider = (): Graphs => ({
  id: "2",
  name: "Number1 Input & Slider",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "21",
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
        data: 0,
        dataType: "number",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "input_and_slider",
        type: "",
      },
    ],
    parentId: "2",
    ioType: "generator",
    operationType: "",
  },
});
