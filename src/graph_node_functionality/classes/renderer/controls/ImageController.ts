import { v4 } from "uuid";
import Rete, { Node } from "../../../../packages/rete-1.4.4";
import ImageControllerRenderer from "./ImageControllerRenderer";

export default class ImageController extends Rete.Control {
  render: string;
  component: any;
  id: string;
  props: {
    id: string;
    emitter: string;
    name: string;
    node: Node;
    data: { img: string };
  };

  constructor(emitter: string, key: string, name: string, node: Node) {
    super(key);
    this.id = v4();
    this.render = "react";
    this.component = ImageControllerRenderer;
    this.props = {
      id: this.id,
      emitter,
      name,
      node,
      data: {
        img: "",
      },
    };
  }
}
