import React, { Component } from 'react'
import OutlinerController from '../components/outliner_components/OutlinerController'
import { defaultColors } from '../constants/Colors'
import { Store } from '../../redux/reducers';
import { connect } from 'react-redux';
import "../scss/outliner.scss"
import { Project } from '../../interfaces/Project';
import { OutlinerElement, OutlinerTypes } from '../../interfaces/OutlinerTree';
import { setSelected } from '../../redux/actions/SystemActions';
import OutlinerItem from '../components/outliner_components/OutlinerItem';
import { getTreeData } from '../services/GetProjectTree';
import _ from "lodash"

interface Props {
  dimensions: { width: number, height: number };
  project: Project;
  setSelected: (type: "graph" | "package",
    graphType: OutlinerTypes,
    id: string) => void;
}

interface State {
  treeData: OutlinerElement;
  selectedItem: string;
  selectedType: OutlinerTypes;
}

class OutlinerComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      treeData: { id: "", name: "Untitled", children: [], type: "project" },
      selectedType: "project",
      selectedItem: ""
    };
  };


  loadTree = () => {
    let treeData = getTreeData(this.props.project.id, this.props.project.fileName, this.props.project.packages);

    if (this.state.treeData.id === treeData.id) {
      for (let i of treeData.children) {
        //Packages
        for (let j of this.state.treeData.children) {
          if (i.id === j.id) {
            i.selected = j.selected;
            i.extended = j.extended;
          }

          for (let k of i.children) {
            //Graphs
            for (let l of j.children) {
              k.selected = l.selected;
              k.extended = l.extended;
            }
          }
        }
      }
    }

    this.setState({
      treeData
    })
  }

  onClickItem = (id: string) => {
    let { treeData } = this.state;

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
          this.props.setSelected("package", "package", id);

          this.setState({ selectedType: "package" });
        }


        for (let j of i.children) {
          j.selected = false;
          if (id === j.id) {
            //Clicked on a graph
            j.selected = true;
            this.props.setSelected("package", "shadergraph", i.id);
            this.props.setSelected("graph", "shadergraph", id);

            this.setState({ selectedType: "graph" });
          }

          for (let k of j.children) {
            k.selected = false;
            if (id === k.id) {
              //clicked on a datagraph
              k.selected = true;
              this.props.setSelected("package", "datagraph", i.id);
              this.props.setSelected("graph", "datagraph", j.id);

              this.setState({ selectedType: "datagraph" });
            }
          }
        }
      }

      this.setState({
        treeData,
        selectedItem: id
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
          }

          for (let k of j.children) {
            if (k.id === id) {
              //clicked on a datagraph or shadergraph
              k.extended = !k.extended;
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
          for (let j of i.children) {
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
    let shouldUpdate = false;
    if (!_.isEqual(prevProps.project.id, this.props.project.id)) {
      shouldUpdate = true;
    }

    if (prevProps.project.packages.length !== this.props.project.packages.length) {
      shouldUpdate = true;
    }

    if (prevProps.project.filePath !== this.props.project.filePath) {
      shouldUpdate = true;
    }

    for (const i of prevProps.project.packages) {
      for (const j of this.state.treeData.children) {
        if (i.id === j.id) {
          if (i.name !== j.name) {
            shouldUpdate = true;
          }
          if (i.graphs.length !== j.children.length) {
            shouldUpdate = true;
          }
          if (i.name !== j.name) {
            shouldUpdate = true;
          }

          for (const graphs of i.graphs) {
            for (const prev of j.children) {
              if (graphs.id === prev.id)
                if (graphs.name !== prev.name)
                  shouldUpdate = true;
            }
          }
        }
      }
    }

    if (shouldUpdate)
      this.loadTree();
  };


  componentDidMount = () => {
    this.loadTree();
  };

  render() {
    return (
      <div>
        <OutlinerController selectedItem={this.state.selectedItem} selectedType={this.state.selectedType} />
        <div style={{
          marginBottom: 20,
          margin: 10,
          width: this.props.dimensions.width - 20,
          height: this.props.dimensions.height - 55,
          backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
          overflow: "auto"
        }}>
          <div style={{ padding: 5 }}>
            {this.renderTree()}
          </div>
        </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(OutlinerComponent)