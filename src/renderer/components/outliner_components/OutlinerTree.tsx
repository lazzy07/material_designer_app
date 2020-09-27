import React, { Component } from 'react'
import OutlinerItem from './OutlinerItem'

export default class OutlinerTree extends Component {
  renderTree = () => {
    return null;
  }

  render() {
    return (
      <div>
        <OutlinerItem outlinerElement={{ id: "hello", name: "Hello world", children: [], type: "project" }} />
      </div>
    )
  }
}
