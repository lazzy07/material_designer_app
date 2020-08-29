import React, { Component } from 'react'
import DropFileComponent from '../components/library_components/DropFileComponent'
import { DRAGGABLE_ITEM_TYPE, DraggableItem } from '../../interfaces/DraggableItem'
import { AssetPreviewFile } from '../../interfaces/AssetPreviewFile'

interface Props {
}

const accceptedDropFileTypes: DRAGGABLE_ITEM_TYPE[] = ["hdri"]

export default class Preview3dComponent extends Component<Props> {
  handleDrop = (data: DraggableItem<AssetPreviewFile>) => {
    console.log(data);
  }

  render() {
    return (
      <DropFileComponent onDropComplete={this.handleDrop} dropType={accceptedDropFileTypes}>
        <div style={{ height: "100%", width: "100%" }}>

        </div>
      </DropFileComponent>
    )
  }
}
