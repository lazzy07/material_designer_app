/* eslint-disable react/prop-types */
import React from "react";

export class Control extends React.Component {
  createRef = (el) => {
    const { innerRef, control } = this.props;

    el && innerRef(el, control);
  };

  render() {
    const { className, control, style } = this.props;

    return (
      <div
        style={style}
        className={className}
        title={control.key}
        ref={this.createRef}
      />
    );
  }
}
