import React, { Component } from 'react'
import OutlinerController from '../components/outliner/OutlinerController'
import { defaultColors } from '../constants/Colors'
import { Store } from '../../redux/reducers';
import { connect } from 'react-redux';
import OutlinerTree from '../components/outliner_components/OutlinerTree';

interface Props {
  dimensions: { width: number, height: number };
  fileName: string;
  graphs: any[];
}

interface State {

}

class OutlinerComponent extends Component<Props, State> {
  createTree = () => {
    if (this.props.fileName != "") {
      return {
        name: this.props.fileName,
        toggled: true,
        children: [
          {
            name: "Hello"
          }
        ]
      }
    } else {
      return {};
    }
  }

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
          <OutlinerTree />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: Store) => {
  return {
    fileName: state.project.fileName,
    graphs: state.project.graphs
  }
}

export default connect(mapStateToProps)(OutlinerComponent)