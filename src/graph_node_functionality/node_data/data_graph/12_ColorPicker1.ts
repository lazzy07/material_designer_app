import { Graphs } from "../../../interfaces/Graphs";

export const ColorPicker1 = (): Graphs => ({
  id: "12",
  name: "Color Picker 1",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "121",
    data: [
      {
        id: "1211",
        name: "Default Value",
        data: 0,
        dataType: "colorvec",
        groups: {
          id: "12111",
          name: "Default",
        },
        inputType: "colorpicker",
        type: "",
      },
    ],
    parentId: "12",
    ioType: "generator",
    operationType: "",
  },
});
