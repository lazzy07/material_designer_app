/* eslint-disable react/prop-types */
import React from "react";
import { kebab } from "./utils";

export class Socket extends React.Component {
  createRef = (el) => {
    const { innerRef, type, io } = this.props;

    el && innerRef(el, type, io);
  };

  render() {
    const { socket, color } = this.props;

    return (
      <div
        className={`socket ${kebab(socket.name)}`}
        style={{
          backgroundColor: color,
          width: 15,
          height: 15,
          borderRadius: 0,
          borderWidth: 0,
        }}
        title={socket.name}
        ref={(el) => this.createRef(el)} // force update for new IO with a same key
      />
    );
  }
}
