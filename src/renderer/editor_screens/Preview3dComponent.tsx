import React, { Component } from 'react'
import DropFileComponent from '../components/library_components/DropFileComponent'
import { DRAGGABLE_ITEM_TYPE, DraggableItem } from '../../interfaces/DraggableItem'
import { AssetPreviewFile } from '../../interfaces/AssetPreviewFile'

const accceptedDropFileTypes: DRAGGABLE_ITEM_TYPE[] = ["hdri"]

export default class Preview3dComponent extends Component {
  onDropComplete = (data: DraggableItem<AssetPreviewFile>) => {
    console.log(data)
  }

  render() {
    return (
      <DropFileComponent onDropComplete={(data) => this.onDropComplete(data)} dropType={accceptedDropFileTypes}>
        <h1>Hello world</h1>
      </DropFileComponent>
    )
  }
}
