import React, { Component } from "react";
import "../../scss/inputbox.scss";
import { defaultColors } from "../../constants/Colors";

interface Props {
  id: string;
  disabled?: boolean;
  focused?: boolean;
  value: string;
  error?: string;
  label?: string;
  onChange: (key: string, val: string) => void;
  placeHolder?: string;
  labelClasses?: string;
  inputClasses?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  rows?: number;
  maxLength?: number;
}

interface State {
  focused?: boolean;
  value: string;
  error: string;
  label: string;
}

export default class Textarea extends Component<Props, State> {
  textBox: any;

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      error: this.props.error || "",
      focused: this.props.focused,
      label: ""
    };
  }

  onChange = (event: any) => {
    const { id } = this.props;
    const value = event.target.value;
    this.setState({ value, error: "" });
    return this.props.onChange(id, value);
  };

  render() {
    let disabled = false;
    const { error } = this.props;
    if (this.textBox) {
      if (this.textBox.disabled) {
        disabled = true;
      }
    }

    return (
      <div
        className="row"
        style={{
          width: "100%",
          display: "flex"
        }}
      >
        <div style={{ flex: 3 }} className={this.props.labelClasses}>
          <label
            className={`inputlabel ${
              !error ? (disabled ? "disabledText" : "") : "errorText"
            }`}
            style={{ paddingRight: 10 }}
            htmlFor={this.props.id}
          >
            {this.props.label}
          </label>
        </div>
        <div
          style={{
            flex: 9,
            position: "relative",
            paddingBottom: 16,
            marginBottom: 5
          }}
          className={this.props.inputClasses}
        >
          <textarea
            value={this.props.value}
            ref={ref => (this.textBox = ref)}
            id={this.props.id}
            name={this.props.id}
            className={`inputclass ${error ? "errorTextbox" : ""}`}
            disabled={this.props.disabled}
            placeholder={this.props.placeHolder}
            onChange={e => this.onChange(e)}
            onFocus={this.props.onFocus || undefined}
            onBlur={this.props.onBlur}
            rows={this.props.rows || 4}
            maxLength={this.props.maxLength}
            style={{ resize: "none" }}
          />
          <label
            style={{
              position: "absolute",
              fontSize: 11,
              right: 2,
              bottom: -9,
              color: defaultColors.ERROR_COLOR,
              fontWeight: "bold"
            }}
            htmlFor={this.props.id}
          >
            {error}
          </label>
          {this.props.maxLength && (
            <label
              style={{
                position: "absolute",
                fontSize: 11,
                left: 2,
                bottom: -9,
                fontWeight: "bold"
              }}
              htmlFor={this.props.id}
            >
              {this.props.value.length} / {this.props.maxLength}
            </label>
          )}
        </div>
      </div>
    );
  }
}
