import React, { Component } from "react";
import { defaultColors, colors } from "../../constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import "../../scss/button.scss";

interface Props {
  disabled?: boolean;
  title: string;
  onClick: () => void;
  background?: string;
  noBorder?: boolean;
  icon?: IconDefinition;
}

interface State {}

export default class Button extends Component<Props, State> {
  render() {
    return (
      <div
        onClick={this.props.disabled ? undefined : this.props.onClick}
        className={
          this.props.disabled ? "" : this.props.noBorder ? "" : "customButton"
        }
        style={{
          backgroundColor:
            this.props.background || defaultColors.IMPORTANT_BACKGROUND_COLOR,
          padding: 10,
          paddingTop: 8,
          paddingBottom: 8,
          minWidth: 80,
          fontWeight: "bolder",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          border:
            this.props.noBorder || this.props.disabled
              ? undefined
              : `2px solid ${colors.LIGHT_GREY}`,
          cursor: !this.props.disabled ? "pointer" : undefined,
          opacity: this.props.disabled ? 0.3 : undefined
        }}
      >
        <div
          style={{
            color: this.props.disabled
              ? defaultColors.DISABLED_FONT_COLOR
              : undefined,
            display: "flex",
            justifyContent: "center"
          }}
        >
          {this.props.icon ? (
            <div style={{ paddingRight: "10px" }}>
              <FontAwesomeIcon icon={this.props.icon} />
            </div>
          ) : null}
          {this.props.title}
        </div>
      </div>
    );
  }
}
