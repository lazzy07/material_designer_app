import { v4 } from "uuid";
import { Input } from "./input";
import { Output } from "./output";

export class Connection {
  id: string;
  output: Output;
  input: Input;
  data: unknown = {};

  constructor(output: Output, input: Input) {
    this.id = v4();
    this.output = output;
    this.input = input;
    this.data = {
      id: this.id,
    };

    this.input.addConnection(this);
  }

  remove() {
    this.input.removeConnection(this);
    this.output.removeConnection(this);
  }
}
