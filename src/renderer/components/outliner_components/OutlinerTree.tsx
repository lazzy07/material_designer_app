import React, { Component } from 'react'
import { connect } from 'react-redux';
import { GraphPackage } from '../../../interfaces/GraphPackage';
import { OutlinerElement } from '../../../interfaces/OutlinerTree';
import { Store } from '../../../redux/reducers';
import { getTreeData } from '../../services/GetProjectTree';
import OutlinerItem from './OutlinerItem'

interface Props {
  projectName: string,
  id: string,
  packages: GraphPackage[];
}

interface State {
  treeData: OutlinerElement;
}

class OutlinerTree extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      treeData: { id: "", name: "Untitled", children: [], type: "project" },
    };
  };


  loadTree = () => {
    if (this.props.id) {
      const treeData = getTreeData(this.props.id, this.props.projectName, this.props.packages);

      this.setState({
        treeData
      })
    }
  }

  renderTree = () => {
    let renderQueue: JSX.Element[] = [];
    const { treeData } = this.state;
    if (treeData) {
      renderQueue.push(
        <OutlinerItem key={treeData.id} outlinerElement={treeData} />
      )
      // Packages
      for (let i of treeData.children) {
        renderQueue.push(
          <OutlinerItem key={i.id} outlinerElement={i} />
        )

        if (i.extended) {
          //Graphs
          for (let j of treeData.children) {
            renderQueue.push(
              <OutlinerItem key={j.id} outlinerElement={j} />
            )
            if (j.extended) {
              for (const k of j.children) {
                renderQueue.push(
                  <OutlinerItem key={k.id} outlinerElement={k} />
                )
              }
            }
          }
        }
      }
    }
    return renderQueue;
  }

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.projectName !== prevProps.projectName) {
      this.loadTree();
    }
  };


  componentDidMount = () => {
    this.loadTree();
  };

  render() {
    return (
      <div style={{ padding: 5 }}>
        {this.renderTree()}
      </div>
    )
  }
}

const mapStateToProps = (state: Store) => {
  return {
    projectName: state.project.fileName,
    id: state.project.id,
    packages: state.project.packages
  }
}

export default connect(mapStateToProps)(OutlinerTree);