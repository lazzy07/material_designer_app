import React, { Component, createRef } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { defaultColors } from "../../constants/Colors";

interface State {
  width: number;
}

interface Props {
  value: number;
}

const MARGIN = 10;

export default class ColrPicker1 extends Component<Props, State> {
  ref = createRef<HTMLDivElement>();

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
    };
  }

  componentDidMount() {
    const ref = this.ref.current!;
    this.setState({ width: ref.offsetWidth - MARGIN * 2 });

    new ResizeObserver(() => {
      this.setState({ width: ref.offsetWidth - MARGIN * 2 });
    }).observe(this.ref.current!);
  }

  render() {
    return (
      <div style={{ margin: 5, position: "relative" }}>
        <div
          ref={this.ref}
          style={{
            width: "100%",
            minWidth: "120px",
            height: "6px",
            marginLeft: MARGIN,
            marginRight: MARGIN,
            background: "linear-gradient(to right, black, white)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            height: "10px",
            width: "10px",
            top: 6,
            left: MARGIN - 5,
            backgroundColor: defaultColors.FONT_COLOR,
            transformOrigin: "center",
            transform: "rotate(45deg)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            height: "14px",
            width: "14px",
            border: "2px solid " + defaultColors.FONT_COLOR,
            top: 10,
            left: MARGIN - 7,
            transformOrigin: "center",
            backgroundColor: `rgb(${this.props.value}, ${this.props.value}, ${this.props.value})`,
            cursor: "pointer",
          }}
        ></div>
      </div>
    );
  }
}
