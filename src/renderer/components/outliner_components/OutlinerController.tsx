import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faPlus, faRecycle, faSync, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
export default class OutlinerController extends Component {
  render() {
    return (
      <div
        style={{
          paddingTop: 2,
          paddingLeft: 10,
          marginBottom: -8,
          fontSize: 12,
          display: "flex",
        }}
      >
        <div className="clickable" style={{ padding: 5, marginRight: 5 }}>
          <FontAwesomeIcon icon={faFolderPlus} />
        </div>
        <div className="clickable" style={{ padding: 5, marginRight: 5 }}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="clickable" style={{ padding: 5, marginRight: 20 }}>
          <FontAwesomeIcon icon={faSync} />
        </div>
      </div>
    )
  }
}
