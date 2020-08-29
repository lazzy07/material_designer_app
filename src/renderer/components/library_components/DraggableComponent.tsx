import React, { Component } from 'react'
import { DraggableItem } from '../../../interfaces/DraggableItem';
import { IS_WEB } from '../../services/Webguard';
import { IpcMessages } from '../../../IpcMessages';

interface Props {
  name: string;
  onDragStart?: () => void;
  data: DraggableItem<any>
}

export default class DraggableComponent extends Component<Props> {
  dragger: string = "";

  onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    this.dragger = this.props.name;
    e.dataTransfer.setData("text/plain", "hello");
    e.dataTransfer.dropEffect = "all";

    if (!IS_WEB) {
      const ipcRenderer = require("electron").ipcRenderer;
      ipcRenderer.send(IpcMessages.DRAG_START, this.props.data);
    } else {
      //TODO:: Web arithmetic
    }

    this.props.onDragStart && this.props.onDragStart();
  }

  render() {
    return (
      <div style={{}} draggable onDragStart={e => this.onDragStart(e)}>
        {this.props.children}
      </div>
    )
  }
}
