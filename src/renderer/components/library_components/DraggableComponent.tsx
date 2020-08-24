import React, { Component } from 'react'

interface Props {
  onDragStart: () => void;
}

export default class DraggableComponent extends Component<Props> {
  onDragStart = () => {
    this.props.onDragStart()
  }

  render() {
    return (
      <div draggable onDragStart={this.onDragStart}>
        {this.props.children}
      </div>
    )
  }
}
