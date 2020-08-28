import React, { Component } from 'react'

interface Props {
  name: string;
  onDragStart: () => void;
}

export default class DraggableComponent extends Component<Props> {
  dragger: string = "";

  onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    this.dragger = this.props.name;
    e.dataTransfer.setData("text/plain", "hello")
    e.dataTransfer.dropEffect = "all"
    this.props.onDragStart();
  }

  render() {
    return (
      <div style={{}} draggable onDragStart={e => this.onDragStart(e)}>
        {this.props.children}
      </div>
    )
  }
}
