import { faArchive, faCopy, faFile, faProjectDiagram, faSquareRootAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { OutlinerElement } from '../../../interfaces/OutlinerTree'

interface Props {
  outlinerElement: OutlinerElement;
}

export default class OutlinerItem extends Component<Props> {
  getMargin = () => {
    switch (this.props.outlinerElement.type) {
      case "project":
        return 0;
      case "package":
        return 10;
      case "graph":
        return 20;
      default:
        return 30;
    }
  }

  getIcon = () => {
    switch (this.props.outlinerElement.type) {
      case "project":
        return faArchive;
      case "package":
        return faCopy;
      case "graph":
        return faFile;
      case "shadergraph":
        return faProjectDiagram;
      case "datagraph":
        return faSquareRootAlt;
    }
  }

  renderIcon = () => {
    return <FontAwesomeIcon icon={this.getIcon()} />
  }

  render() {
    return (
      <div style={{ marginLeft: this.getMargin(), display: "flex", padding: 5 }}>
        <div style={{ paddingRight: 10 }}>
          {this.renderIcon()}
        </div>
        <div>
          {this.props.outlinerElement.name}
        </div>
      </div>
    )
  }
}
