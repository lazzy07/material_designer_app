import React, { Component } from 'react'

interface Props {
  name: string;
  onDragStart: () => void;
}

export default class DraggableComponent extends Component<Props> {
  dragger: string = "";

  onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    this.dragger = this.props.name;
    this.props.onDragStart()
  }

  componentDidMount = () => {
    document.addEventListener("dragend", event => {
      event.preventDefault();
      if (this.dragger === this.props.name) {
        this.dragger = ""
        console.log((event.target as any).className.includes("dropper"))
      }
    })
  };

  render() {
    return (
      <div draggable onDragStart={e => this.onDragStart(e)}>
        {this.props.children}
      </div>
    )
  }
}
