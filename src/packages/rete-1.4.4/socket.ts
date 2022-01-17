import { v4 } from "uuid";

export class Socket {
  id: string;
  name: string;
  data: unknown;
  compatible: Socket[] = [];

  constructor(name: string, data = {}) {
    this.id = v4();
    this.name = name;
    this.data = data;
    this.compatible = [];
  }

  combineWith(socket: Socket) {
    this.compatible.push(socket);
  }

  compatibleWith(socket: Socket) {
    return this === socket || this.compatible.includes(socket);
  }
}
