import React, { Component } from 'react'
import { connect } from 'react-redux';
import { OutlinerElement } from '../../../interfaces/OutlinerTree';
import { Project } from '../../../interfaces/Project';
import { Store } from '../../../redux/reducers';
import { getTreeData } from '../../services/GetProjectTree';
import OutlinerItem from './OutlinerItem'

interface Props {
  project: Project
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
    const treeData = getTreeData(this.props.project.id, this.props.project.fileName, this.props.project.packages);
    this.setState({
      treeData
    })
  }

  onClickItem = (id: string) => {
    const { treeData } = this.state;

    if (treeData) {
      //Have clicked on the project
      if (id === treeData.id) {
        //Do nothing
      }

      //Packages
      for (let i of treeData.children) {
        i.selected = false;
        if (id === i.id) {
          //Clicked on a package
          i.selected = true;
        }


        for (let j of i.children) {
          j.selected = false;
          if (id === j.id) {
            //Clicked on a graph
            j.selected = true;

            for (let k of j.children) {
              if (k.id === id) {
                //clicked on a datagraph or shadergraph
                k.selected = true;
              }
            }
          }

        }
      }

      this.setState({
        treeData
      })
    }
  }

  onExtendItem = (id: string) => {
    const { treeData } = this.state;

    if (treeData) {
      //Have clicked on the project
      if (id === treeData.id) {
        //Do nothing
      }

      //Packages
      for (let i of treeData.children) {
        i.extended = false;
        if (id === i.id) {
          //Clicked on a package
          i.extended = true;
        }


        for (let j of i.children) {
          j.extended = false;
          if (id === j.id) {
            //Clicked on a graph
            j.extended = true;

            for (let k of j.children) {
              if (k.id === id) {
                //clicked on a datagraph or shadergraph
                k.extended = true;
              }
            }
          }
        }
      }

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
        <OutlinerItem onExtend={this.onExtendItem} onClick={this.onClickItem} key={treeData.id} outlinerElement={treeData} />
      )
      // Packages
      for (let i of treeData.children) {
        renderQueue.push(
          <OutlinerItem onExtend={this.onExtendItem} onClick={this.onClickItem} key={i.id} outlinerElement={i} />
        )

        if (i.extended) {
          //Graphs
          for (let j of treeData.children) {
            renderQueue.push(
              <OutlinerItem onExtend={this.onExtendItem} onClick={this.onClickItem} key={j.id} outlinerElement={j} />
            )
            if (j.extended) {
              for (const k of j.children) {
                renderQueue.push(
                  <OutlinerItem onExtend={this.onExtendItem} onClick={this.onClickItem} key={k.id} outlinerElement={k} />
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
    if (JSON.stringify(this.props.project) !== JSON.stringify(prevProps.project)) {
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
    project: state.project
  }
}

export default connect(mapStateToProps)(OutlinerTree);