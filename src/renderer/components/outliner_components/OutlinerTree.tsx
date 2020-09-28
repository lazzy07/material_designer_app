import React, { Component } from 'react'
import { connect } from 'react-redux';
import { OutlinerElement, OutlinerTypes } from '../../../interfaces/OutlinerTree';
import { Project } from '../../../interfaces/Project';
import { setSelected } from '../../../redux/actions/SystemActions';
import { Store } from '../../../redux/reducers';
import { getTreeData } from '../../services/GetProjectTree';
import OutlinerItem from './OutlinerItem'

interface Props {
  project: Project;
  setSelected: (type: "graph" | "package",
    graphType: OutlinerTypes,
    id: string) => void;
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
        return;
      }

      //Packages
      for (let i of treeData.children) {
        i.selected = false;
        if (id === i.id) {
          //Clicked on a package
          i.selected = true;
          this.props.setSelected("package", "shadergraph", id);
        }


        for (let j of i.children) {
          j.selected = false;
          if (id === j.id) {
            //Clicked on a graph
            j.selected = true;
            this.props.setSelected("package", "shadergraph", i.id);
            this.props.setSelected("graph", "shadergraph", id);


            for (let k of j.children) {
              if (k.id === id) {
                //clicked on a datagraph or shadergraph
                k.selected = true;

                this.props.setSelected("package", "shadergraph", i.id);
                this.props.setSelected("graph", i.type, id);
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
        if (id === i.id) {
          //Clicked on a package
          i.extended = !i.extended;
        }


        for (let j of i.children) {
          if (id === j.id) {
            //Clicked on a graph
            j.extended = !j.extended;

            for (let k of j.children) {
              if (k.id === id) {
                //clicked on a datagraph or shadergraph
                k.extended = !k.extended;
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

  onChangeName = (id: string, name: string) => {
    let { treeData } = this.state;

    if (treeData) {
      for (let pkg of treeData.children) {
        if (pkg.id === id) {
          pkg.name = name;
          return;
        }
        for (let graph of pkg.children) {
          graph.name = name;
          return;
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
        <OutlinerItem onSubmitChangeName={this.onChangeName} onExtend={this.onExtendItem} onClick={this.onClickItem} key={treeData.id} outlinerElement={treeData} />
      )
      // Packages
      for (let i of treeData.children) {
        renderQueue.push(
          <OutlinerItem onSubmitChangeName={this.onChangeName} onExtend={this.onExtendItem} onClick={this.onClickItem} key={i.id} outlinerElement={i} />
        )

        if (i.extended) {
          //Graphs
          for (let j of i.children) {
            renderQueue.push(
              <OutlinerItem onSubmitChangeName={this.onChangeName} onExtend={this.onExtendItem} onClick={this.onClickItem} key={j.id} outlinerElement={j} />
            )
            if (j.extended) {
              for (const k of j.children) {
                renderQueue.push(
                  <OutlinerItem onSubmitChangeName={this.onChangeName} onExtend={this.onExtendItem} onClick={this.onClickItem} key={k.id} outlinerElement={k} />
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
const mapDispatchToProps = {
  setSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(OutlinerTree);