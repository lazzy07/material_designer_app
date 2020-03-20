import React, { Component } from "react";
import "../../scss/checkbox.scss";

interface Props {
  checked?: boolean;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface State {}

export default class Checkbox extends Component<Props, State> {
  onClick = (e: any) => {
    this.props.onClick();
  };

  render() {
    return (
      <div style={{ opacity: this.props.disabled ? 0.5 : undefined }}>
        <label
          className={`containerChk ${
            this.props.disabled ? "" : "containerChkHover"
          }`}
        >
          {this.props.label}
          <input
            disabled={this.props.disabled}
            type="checkbox"
            checked={this.props.checked}
            onChange={this.onClick}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    );
  }
}
