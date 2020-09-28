import { faArchive, faBoxOpen, faCaretDown, faCaretRight, faCopy, faDiceD6, faFile, faProjectDiagram, faSquareRootAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { OutlinerElement } from '../../../interfaces/OutlinerTree'
import ContentEditable from 'react-contenteditable'

interface Props {
  outlinerElement: OutlinerElement;
  onClick: (id: string) => void;
  onExtend: (id: string) => void;
  onSubmitChangeName: (id: string, name: string) => void;
}

interface State {
  disabled: boolean;
  value: string;
}

export default class OutlinerItem extends Component<Props, State> {
  contentEditable = React.createRef<HTMLElement>();
  constructor(props: Props) {
    super(props)

    this.state = {
      disabled: true,
      value: this.props.outlinerElement.name
    };
  };


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

  onDoubleClick = () => {
    if (this.props.outlinerElement.type === "package" || this.props.outlinerElement.type === "graph")
      this.setState({
        disabled: false
      })

    // setTimeout(() => {
    //   if (document.activeElement !== this.ref) {
    //     this.setState({
    //       disabled: true
    //     })
    //   }
    // }, 300)
  }

  onChange = (e: any) => {
    if (this.props.outlinerElement.type === "package" || this.props.outlinerElement.type === "graph")
      this.setState({ value: e.target.value })
  }

  onChangeFinished = () => {
    this.setState({ disabled: true })

    if (this.props.outlinerElement.name !== this.state.value)
      if (this.state.value.length > 0) {
        this.props.onSubmitChangeName(this.props.outlinerElement.id, this.state.value)
      } else {
        this.setState({
          value: this.props.outlinerElement.name
        })
      }
  }

  render() {
    const { type, extended, id } = this.props.outlinerElement;
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
          <ContentEditable
            onBlur={this.onChangeFinished}
            onClick={this.onDoubleClick}
            className={this.addStyles()}
            style={{ paddingLeft: 5, paddingRight: 5 }}
            innerRef={this.contentEditable}
            html={this.state.value}
            onChange={this.onChange}
            disabled={this.state.disabled}
          />
        </div>

      </div>
    )
  }
}
