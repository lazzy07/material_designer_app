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
        id: "111",
        name: "Default Value",
        data: 0,
        dataType: "number",
        groups: {
          id: "2111",
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
