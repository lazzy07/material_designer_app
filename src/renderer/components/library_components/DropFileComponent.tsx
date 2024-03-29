import React, { Component } from 'react'
import { DRAGGABLE_ITEM_TYPE, DraggableItem } from '../../../interfaces/DraggableItem'
import { IS_WEB } from '../../services/Webguard';
import { IpcMessages } from '../../../IpcMessages';

interface Props {
  dropType: DRAGGABLE_ITEM_TYPE[];
  onDropComplete: (data: DraggableItem<any>) => void;
}

interface State {
  draggedData: DraggableItem<any> | null;
  acceptDrag: boolean;
}

export default class DropFileComponent extends Component<Props, State> {
  ref: HTMLDivElement | null = null;

  constructor(props) {
    super(props)

    this.state = {
      draggedData: null,
      acceptDrag: false
    };
  };


  onDrop = () => {
    for (const i of this.props.dropType) {
      if (i === this.state.draggedData?.itemType) {
        this.setState({
          acceptDrag: true,
        })
      }
    }


    if (!IS_WEB) {
      const ipcRenderer = require("electron").ipcRenderer;
      ipcRenderer.send(IpcMessages.GET_DRAG_DATA);
    }
  }

  onDragEnter = (_: React.DragEvent<HTMLDivElement>) => {
    if (!IS_WEB) {
      const ipcRenderer = require("electron").ipcRenderer;
      ipcRenderer.send(IpcMessages.GET_DRAG_DATA);
    }
  }

  dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    for (const i of this.props.dropType) {
      if (i === this.state.draggedData?.itemType) {
        e.preventDefault();
        e.dataTransfer!.dropEffect = "copy"
      }
    }
  }

  listenToDragData = (_: any, data: DraggableItem<any>) => {
    this.setState({
      draggedData: data
    })

    if (this.state.acceptDrag) {
      this.setState({ acceptDrag: false });
      this.props.onDropComplete(data)
    }
  }

  componentDidMount = () => {
    if (!IS_WEB) {
      const ipcRenderer = require("electron").ipcRenderer;
      ipcRenderer.on(IpcMessages.DRAG_DATA, this.listenToDragData);
    }
  };

  componentWillUnmount = () => {
    if (!IS_WEB) {
      const ipcRenderer = require("electron").ipcRenderer;
      ipcRenderer.removeListener(IpcMessages.DRAG_DATA, this.listenToDragData);
    }
  }


  render() {
    return (
      <div style={{ width: "100%", height: "100%" }} onDragEnter={e => this.onDragEnter(e)} onDragOver={e => this.dragOver(e)} onDrop={this.onDrop} ref={ref => this.ref = ref}>
        {this.props.children}
      </div>
    )
  }
}
