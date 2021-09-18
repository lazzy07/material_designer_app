import React from "react";
import ColorStop from "./ColorStop";

class ColorStopsHolder extends React.Component<any> {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleMouseDown(e) {
    e.preventDefault();
    if (e.button) return;
    const pos = e.clientX - e.target.getBoundingClientRect().left;
    this.props.onAddColor({ pos, pointX: e.clientX });
  }

  render() {
    const { width, stops, onAddColor, ...rest } = this.props;
    const style = {
      width,
      height: 17,
      position: "relative",
      cursor: "crosshair",
    };
    return (
      <div
        className="csh"
        style={style as any}
        onMouseDown={this.handleMouseDown}
      >
        {stops.map((stop) => (
          <ColorStop key={stop.id} stop={stop} {...rest} />
        ))}
      </div>
    );
  }
}

export default ColorStopsHolder;
