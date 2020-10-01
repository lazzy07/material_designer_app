import { faArchive, faBoxOpen, faCaretDown, faCaretRight, faProjectDiagram, faSquareRootAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { OutlinerElement } from '../../../interfaces/OutlinerTree'

interface Props {
  outlinerElement: OutlinerElement;
  onClick: (id: string) => void;
  onExtend: (id: string) => void;
}

interface State {
  value: string;
}

export default class OutlinerItem extends Component<Props, State> {
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
        return faBoxOpen;
      case "package":
        return faArchive;
      case "graph":
        return faProjectDiagram;
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
    return this.props.outlinerElement.selected ? "treeItemActive" : "";
  }

  onChange = (e: any) => {
    if (this.props.outlinerElement.type === "package" || this.props.outlinerElement.type === "graph")
      this.setState({ value: e.target.value })
  }

  render() {
    const { type, extended, id, name } = this.props.outlinerElement;
    return (
      <div className={"treeItem"} style={{ marginLeft: this.getMargin(), display: "flex", padding: 0 }}>
        {(type !== "shadergraph" && type !== "datagraph") &&
          <div onClick={() => this.props.onExtend(id)} style={{ paddingRight: 10 }}>
            <FontAwesomeIcon icon={extended ? faCaretDown : faCaretRight} />
          </div>}
        <div onClick={() => { this.props.onClick(id); }} style={{ display: "flex" }}>
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
