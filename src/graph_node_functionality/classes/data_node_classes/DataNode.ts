import { Component } from "../../../packages/rete-1.4.4";
import { NodePropertyData } from "../../interfaces/NodePropertyData";
import { Number1Properties } from "../../interfaces/Number1Properties";

export default class DataNode extends Component {
  data: NodePropertyData<Number1Properties>;

  constructor(data: NodePropertyData<Number1Properties>) {
    super(data.name);
    this.data = data;
  }

  async builder() {}

  async worker() {}
}
