import { Graphs } from "../../../interfaces/Graphs";

export const ColorPicker3 = (): Graphs => ({
  id: "13",
  name: "Color Picker 3",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "131",
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
        id: "1311",
        name: "Default Value",
        data: "#ffffff",
        dataType: "colorvec3",
        groups: {
          id: "13111",
          name: "Default",
        },
        inputType: "colorpicker",
        type: "",
      },
    ],
    parentId: "13",
    ioType: "generator",
    operationType: "",
  },
});
