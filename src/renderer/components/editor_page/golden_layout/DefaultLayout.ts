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
        width: 55,
        type: "column",
        content: [
          {
            height: 45,
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
            height: 55,
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
        width: 25,
        type: "column",
        content: [
          {
            type: "row",
            content: [
              {
                height: 35,
                title: "Outliner",
                type: "react-component",
                component: "testItem"
              }
            ]
          },
          {
            height: 65,
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
