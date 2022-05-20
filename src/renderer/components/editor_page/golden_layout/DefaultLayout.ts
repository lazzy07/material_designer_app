import {
  DataNodeLibrary,
  ShaderNodeLibrary,
  HdriLibrary,
  TextureLibrary,
  Preview3D,
  NodePreview,
  DataGraphEditor,
  ShaderGraphEditor,
  Outliner,
  NodeProps,
  GraphProps,
  CompilerOutput,
  FunctionsEditor,
  InputOutputEditor,
  KernelEditor,
} from "../../../../EditorElements";

export const DEFAULT_LAYOUT = [
  {
    type: "row",
    content: [
      {
        width: 20,
        type: "column",
        content: [
          {
            type: "stack",
            content: [
              ShaderNodeLibrary,
              DataNodeLibrary,
              HdriLibrary,
              TextureLibrary,
            ],
          },
        ],
      },
      {
        //Viewers
        width: 55,
        type: "column",
        content: [
          {
            height: 45,
            type: "row",
            content: [Preview3D, NodePreview],
          },
          {
            height: 55,
            type: "row",

            content: [
              {
                type: "stack",
                content: [
                  ShaderGraphEditor,
                  DataGraphEditor,
                  FunctionsEditor,
                  KernelEditor,
                  InputOutputEditor,
                  CompilerOutput,
                ],
              },
            ],
          },
        ],
      },
      {
        // outliner and options
        width: 25,
        type: "column",
        content: [
          {
            type: "stack",
            height: 35,
            content: [Outliner],
          },
          {
            height: 65,
            type: "stack",
            content: [NodeProps, GraphProps],
          },
        ],
      },
    ],
  },
];

// {
//   title: "A react component",
//   type: "react-component",
//   component: "testItem",
//   props: { value: "I'm on the left" }
// },
// {
//   title: "Another react component",
//   type: "react-component",
//   component: "testItem"
// }
