import { Graphs } from "../../../interfaces/Graphs";

export const ColorPicker3 = (): Graphs => ({
  id: "13",
  name: "Color Picker 3",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "131",
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
        data: "#ffffff",
        dataType: "colorvec3",
        groups: {
          id: "default",
          name: "Default",
        },
        inputType: "colorpicker",
        type: "",
      },
    },
    parentId: "13",
    ioType: "generator",
    operationType: "",
  },
});
