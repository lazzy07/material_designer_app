import React from "react";
import { NodePropertyData } from "../../graph_node_functionality/interfaces/NodePropertyData";
import InputNumber from "../components/graph_property_inputs/InputNumber";

export const renderDatagraphElement = (nodeProperty: NodePropertyData<any>) => {
  return (
    <div>
      <div
        style={{
          padding: "3px 10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>{nodeProperty.name}</div>
      </div>
      <div>{selectGraphElement(nodeProperty)}</div>
    </div>
  );
};

const selectGraphElement = (nodeProperty: NodePropertyData<any>) => {
  if (nodeProperty.dataType === "number") {
    return <InputNumber value={nodeProperty.data} onChange={() => {}} />;
  }
};
