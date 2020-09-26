import React, { Component } from 'react'
import OutlinerController from '../components/outliner/OutlinerController'
import { defaultColors } from '../constants/Colors'

interface Props {
  dimensions: { width: number, height: number }
}

interface State {

}

export default class OutlinerComponent extends Component<Props, State> {
  render() {
    return (
      <div>
        <OutlinerController />
        <div style={{
          marginBottom: 20,
          margin: 10,
          width: this.props.dimensions.width - 20,
          height: this.props.dimensions.height - 40,
          backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR
        }}>

        </div>
      </div>
    )
  }
}
