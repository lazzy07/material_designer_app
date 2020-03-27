import React, { Component } from "react";

interface State {
  width: number;
  height: number;
}

interface Props {
  glContainer: any;
  glEventHub: any;
}

export default abstract class ScreenComponent<P, S> extends Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      width: this.props.glContainer.width,
      height: this.props.glContainer.height
    };
    this.calDimensions();
  }

  calDimensions = () => {
    this.props.glContainer.on("resize", () => {
      this.setState({
        width: this.props.glContainer.width,
        height: this.props.glContainer.height
      });
    });
  };

  render() {
    return <div></div>;
  }
}
