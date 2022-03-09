import { v4 } from "uuid";
import { Graphs } from "../../../interfaces/Graphs";

export const OutputCol3: Graphs = {
  id: "31",
  name: "Out Col3",
  type: "dataGraph",
  contentType: "graph",
  children: [],
  dataGraph: {
    id: "311",
    data: [
      {
        id: "3111",
        name: "Default Value",
        data: "#ffffff",
        dataType: "colorvec3",
        groups: {
          id: "31111",
          name: "Default",
        },
        inputType: "colorpicker",
        type: "",
      },
      {
        id: "var_name",
        name: "Variable Name",
        data: v4(),
        dataType: "string",
        groups: {
          id: "31111",
          name: "Default",
        },
        inputType: "input",
        type: "",
      },
      {
        id: "id",
        name: "ID",
        data: v4(),
        dataType: "string",
        groups: {
          id: "31111",
          name: "Default",
        },
        inputType: "input",
        type: "",
        isHidden: true,
      },
    ],
    parentId: "31",
    ioType: "output",
    operationType: "",
  },
};
