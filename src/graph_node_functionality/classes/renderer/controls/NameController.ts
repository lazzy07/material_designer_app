import Rete, { Node } from "../../../../packages/rete-1.4.4";
import NameControllerRenderer from "./NameControllerRenderer";

export default class NameController extends Rete.Control {
  render: string;
  component: any;
  props: { emitter: string; name: string; node: Node };

  constructor(emitter: string, key: string, name: string, node: Node) {
    super(key);
    this.render = "react";
    this.component = NameControllerRenderer;
    this.props = {
      emitter,
      name,
      node,
    };
  }
}
