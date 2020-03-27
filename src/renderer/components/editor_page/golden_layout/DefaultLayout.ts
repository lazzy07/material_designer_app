import {
  NodeLibrary,
  HdriLibrary,
  TextureLibrary,
  Preview3D,
  NodePreview,
  GraphEditor,
  Outliner,
  NodeProps,
  GraphProps
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
            content: [NodeLibrary, HdriLibrary, TextureLibrary]
          }
        ]
      },
      {
        //Viewers
        width: 55,
        type: "column",
        content: [
          {
            height: 45,
            type: "row",
            content: [Preview3D, NodePreview]
          },
          {
            height: 55,
            type: "row",
            content: [GraphEditor]
          }
        ]
      },
      {
        // outliner and options
        width: 25,
        type: "column",
        content: [
          {
            type: "stack",
            height: 35,
            content: [Outliner]
          },
          {
            height: 65,
            type: "stack",
            content: [NodeProps, GraphProps]
          }
        ]
      }
    ]
  }
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
