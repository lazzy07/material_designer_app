import React, { Component } from 'react'
import { defaultColors } from '../constants/Colors'
import { createGrid } from '../services/CreateGrid'

interface Props {
  dimensions: { width: number; height: number };
}

export default class GraphEditorComponent extends Component<Props> {
  render() {
    return (
      <div style={{
        backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
        height: "100%",
        width: "100%",
      }}>
        {createGrid(defaultColors.DEFAULT_BACKGROUND_COLOR, this.props.dimensions.width, this.props.dimensions.height, 1.5, 10, 10)}
      </div>
    )
  }
}
