import React, { Component } from 'react'
import panzoom from "panzoom";
import { defaultColors } from '../constants/Colors';

interface Props {
  dimensions: { height: number, width: number }
}

interface State {

}

export default class NodePreviewComponent extends Component<Props, State> {
  ref = React.createRef<HTMLImageElement>();

  componentDidMount = () => {
    panzoom(this.ref.current!, { smoothScroll: false, maxZoom: 5, minZoom: 0.15, autocenter: false });
  };


  render() {
    return (
      <div style={{ outline: "none", backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR, width: this.props.dimensions.width, height: this.props.dimensions.height - 30, overflow: "hidden", zIndex: -10000000 }}>
        <img ref={this.ref} alt="" src={"https://picsum.photos/1200"} height={300} style={{ overflow: "auto" }} />
      </div>
    )
  }
}
