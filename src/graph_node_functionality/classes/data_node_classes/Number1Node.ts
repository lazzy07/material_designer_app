import { Component } from "../../../packages/rete-1.4.4";
import { NodePropertyData } from "../../interfaces/NodePropertyData";
import { Number1Properties } from "../../interfaces/Number1Properties";

export default abstract class Number1Node extends Component {
  data: NodePropertyData<Number1Properties>;

  constructor(data: NodePropertyData<Number1Properties>) {
    super(data.name);
    this.data = data;
  }
}
