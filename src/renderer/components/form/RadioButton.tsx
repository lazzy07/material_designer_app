import React, { Component } from "react";
import "../../scss/radiobutton.scss";

interface Props {
  id: string;
  checked: boolean;
  title?: string;
  disabled?: boolean;
  onClick: () => void;
}

interface State {}

export default class RadioButton extends Component<Props, State> {
  render() {
    return (
      <div className={this.props.disabled ? "disabledRadio" : ""}>
        <label onClick={this.props.onClick} className="containerRadio">
          {this.props.title}
          <input
            disabled={this.props.disabled}
            type="radio"
            checked={this.props.checked}
            name={this.props.id}
            onChange={() => {}}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    );
  }
}
