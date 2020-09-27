import { GraphPackage } from "../../interfaces/GraphPackage";
import { OutlinerElement } from "../../interfaces/OutlinerTree";

export const getTreeData = (projectName: string, graphs: GraphPackage[]) => {
  let elements: OutlinerElement = {
    name: projectName,
    type: "project",
    children: [],
  };

  for (let pkg of graphs) {
    let packageElem: OutlinerElement = {
      name: pkg.name,
      type: "package",
      children: [],
    };
    for (let i of pkg.graphs) {
      let graphElem: OutlinerElement = {
        name: i.name,
        type: "graph",
        children: [],
      };
      graphElem.children.push({
        name: "Shader Graph",
        type: "shadergraph",
        children: [],
      });
      graphElem.children.push({
        name: "Data Graph",
        type: "datagraph",
        children: [],
      });
      packageElem.children.push(graphElem);
    }

    elements.children.push(packageElem);
  }
  return elements;
};
