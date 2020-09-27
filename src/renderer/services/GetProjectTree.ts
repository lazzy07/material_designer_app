import { GraphPackage } from "../../interfaces/GraphPackage";
import { OutlinerElement } from "../../interfaces/OutlinerTree";

export const getTreeData = (
  projectId: string,
  projectName: string,
  graphs: GraphPackage[]
) => {
  let elements: OutlinerElement = {
    id: projectId,
    name: projectName,
    type: "project",
    children: [],
  };

  for (let pkg of graphs) {
    let packageElem: OutlinerElement = {
      id: pkg.id,
      name: pkg.name,
      type: "package",
      children: [],
    };
    for (let i of pkg.graphs) {
      let graphElem: OutlinerElement = {
        id: i.id,
        name: i.name,
        type: "graph",
        children: [],
      };
      graphElem.children.push({
        id: i.shaderGraph.id,
        name: "Shader Graph",
        type: "shadergraph",
        children: [],
      });
      graphElem.children.push({
        id: i.dataGraph.id,
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
