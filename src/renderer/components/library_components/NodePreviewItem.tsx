import React, { Component } from 'react'
import { NodeData } from '../../../interfaces/NodeData'
import { defaultColors } from '../../constants/Colors';
import { getNodeColor } from './../../services/NodeColors';
import DraggableComponent from './DraggableComponent';

interface Props {
  data: NodeData
}

export default class NodePreviewItem extends Component<Props> {
  renderIcon = () => {
    const { type, name } = this.props.data;

    const nodeColor = getNodeColor(type);
    const firstLetter = name[0].toUpperCase();

    return <div style={{ width: 35, height: 35, borderRadius: "50%", backgroundColor: nodeColor, display: "flex", justifyContent: "center", alignItems: 'center' }}>
      <div style={{ fontSize: 25, color: defaultColors.DEFAULT_BACKGROUND_COLOR, fontWeight: "bolder" }}>{firstLetter}</div>
    </div>
  }

  renderType = () => {
    const { type } = this.props.data;

    return <div>
      {type.split(".")[0]}
    </div>
  }

  render() {
    return (
      <DraggableComponent data={{ item: this.props.data, itemType: "node" }} name={this.props.data.id}>
        <div className="imagePreview" style={{ marginLeft: 10, paddingLeft: 5, paddingRight: 5, marginRight: 10, display: "flex" }}>
          <div style={{ paddingRight: 20 }}>
            {this.renderIcon()}
          </div>
          <div>
            <div style={{ color: getNodeColor(this.props.data.type), fontWeight: "bolder" }}>
              {this.props.data.name}
            </div>
            <div style={{ marginTop: -9 }}>
              {this.renderType()}
            </div>
          </div>
        </div>
      </DraggableComponent>
    )
  }
}
