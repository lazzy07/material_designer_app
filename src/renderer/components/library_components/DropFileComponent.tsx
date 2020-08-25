import React, { Component } from 'react'
import { DRAGGABLE_ITEM_TYPE, DraggableItem } from '../../../interfaces/DraggableItem'

interface Props {
  dropType: DRAGGABLE_ITEM_TYPE[];
  onDropComplete: (data: DraggableItem<any>) => void;
}

export default class DropFileComponent extends Component<Props> {
  onDropComplete = (data: DraggableItem<any>) => {
    this.props.onDropComplete(data)
  }

  componentDidMount = () => {

  };

  componentWillUnmount() {
  }


  render() {
    return (
      <div className="dropper">
        {this.props.children}
      </div>
    )
  }
}
