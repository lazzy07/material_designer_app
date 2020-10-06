import Rete from "../../../packages/rete-1.4.4";
import ImageControllerRenderer from "./ImageControllerRenderer";

export default class ImageController extends Rete.Control {
  render: string;
  component: any;
  props: { emitter: string; name: string };

  constructor(emitter: string, key: string, name: string) {
    super(key);
    this.render = "react";
    this.component = ImageControllerRenderer;
    this.props = { emitter, name };
  }
}
