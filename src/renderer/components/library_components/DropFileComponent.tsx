import React, { Component } from 'react'
import { DRAGGABLE_ITEM_TYPE, DraggableItem } from '../../../interfaces/DraggableItem'

interface Props {
  dropType: DRAGGABLE_ITEM_TYPE[];
  onDropComplete: (data: DraggableItem<any>) => void;
}

export default class DropFileComponent extends Component<Props> {
  ref: HTMLDivElement | null = null;

  onDrop = () => {
    console.log("Dropped")
  }

  dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = "copy"
    e.dataTransfer!.setData("text/plain", "hello")
  }

  componentDidMount = () => {

  };


  render() {
    return (
      <div onDragOver={e => this.dragOver(e)} onDrop={this.onDrop} ref={ref => this.ref = ref}>
        {this.props.children}
      </div>
    )
  }
}
