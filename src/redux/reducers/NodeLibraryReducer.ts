import { Graphs } from "../../interfaces/Graphs";
import { Action } from "../store";

export interface NodeLibraryReducer {
  dataGraphNodes: Graphs[];
  shaderGraphNodes: Graphs[];
}

const initState: NodeLibraryReducer = {
  dataGraphNodes: [
    {
      id: "1",
      name: "Number1 Input",
      type: "dataGraph",
      contentType: "graph",
      children: [],
      dataGraph: {
        id: "11",
        data: [
          {
            id: "111",
            name: "Default Value",
            data: 0,
            dataType: "number",
            groups: {
              id: "1111",
              name: "Default",
            },
            inputType: "input",
            type: "",
          },
        ],
        parentId: "1",
        ioType: "generator",
        operationType: "",
      },
    },
    {
      id: "2",
      name: "Number1 Input & Slider",
      type: "dataGraph",
      contentType: "graph",
      children: [],
      dataGraph: {
        id: "21",
        data: [
          {
            id: "211",
            name: "Default Value",
            data: 0,
            dataType: "number",
            groups: {
              id: "2111",
              name: "Default",
            },
            inputType: "input",
            type: "",
          },
        ],
        parentId: "2",
        ioType: "generator",
        operationType: "",
      },
    },
  ],
  shaderGraphNodes: [],
};

export const nodeLibraryReducer = (state = initState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
