import { faArchive, faCaretDown, faCaretRight, faCopy, faFile, faProjectDiagram, faSquareRootAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { OutlinerElement } from '../../../interfaces/OutlinerTree'

interface Props {
  outlinerElement: OutlinerElement;
  onClick: (id: string) => void;
  onExtend: (id: string) => void;
}

export default class OutlinerItem extends Component<Props> {
  getMargin = () => {
    switch (this.props.outlinerElement.type) {
      case "project":
        return 0;
      case "package":
        return 20;
      case "graph":
        return 40;
      default:
        return 60;
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

  addStyles = () => {
    console.log(this.props.outlinerElement.selected)
    return this.props.outlinerElement.selected ? "treeItemActive" : "";
  }

  render() {
    const { type, extended, id, name } = this.props.outlinerElement;
    return (
      <div className={"treeItem"} style={{ marginLeft: this.getMargin(), display: "flex", padding: 0 }}>
        {(type !== "shadergraph" && type !== "datagraph") &&
          <div onClick={() => this.props.onExtend(id)} style={{ paddingRight: 10 }}>
            <FontAwesomeIcon icon={extended ? faCaretDown : faCaretRight} />
          </div>}
        <div onClick={() => this.props.onClick(id)} style={{ display: "flex" }}>
          <div style={{ paddingRight: 5 }}>
            {this.renderIcon()}
          </div>
          <div className={this.addStyles()} style={{ paddingLeft: 5, paddingRight: 5 }}>
            {name}
          </div>
        </div>

      </div>
    )
  }
}
