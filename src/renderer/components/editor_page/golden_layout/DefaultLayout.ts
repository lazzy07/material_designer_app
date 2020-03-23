export const DEFAULT_LAYOUT = [
  {
    type: "row",
    content: [
      {
        //Libraries
        type: "column",
        content: [
          {
            type: "stack",
            content: [
              {
                title: "Nodes",
                type: "react-component",
                component: "testItem"
              },
              {
                title: "HDRIs",
                type: "react-component",
                component: "testItem"
              },
              {
                title: "Textures",
                type: "react-component",
                component: "testItem"
              }
            ]
          }
        ]
      },
      {
        //Viewers
        type: "column",
        content: [
          {
            type: "row",
            content: [
              {
                title: "3D Preview",
                type: "react-component",
                component: "testItem"
              },
              {
                title: "Node Preview",
                type: "react-component",
                component: "testItem"
              }
            ]
          },
          {
            type: "row",
            content: [
              {
                title: "Graph Editor",
                type: "react-component",
                component: "testItem"
              }
            ]
          }
        ]
      },
      {
        // outliner and options
        type: "column",
        content: [
          {
            type: "row",
            content: [
              {
                title: "Outliner",
                type: "react-component",
                component: "testItem"
              }
            ]
          },
          {
            type: "stack",
            content: [
              {
                title: "Node Props",
                type: "react-component",
                component: "testItem"
              },
              {
                title: "Project Props",
                type: "react-component",
                component: "testItem"
              }
            ]
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
