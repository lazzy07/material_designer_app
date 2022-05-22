import { Graphs } from "../../../interfaces/Graphs";

export const ColorPicker1 = (): Graphs => ({
  id: "12",
  name: "Color Picker 1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "121",
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
        dataType: "colorvec",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "colorpicker",
        type: "",
      },
    },
    parentId: "12",
    ioType: "generator",
    operationType: "",
  },
});
