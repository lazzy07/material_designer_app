import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faPlus, faSync } from "@fortawesome/free-solid-svg-icons";
import { createPackage, injectPackage } from '../../services/CreateGraphs';
import { connect } from 'react-redux';
import { Store } from '../../../redux/reducers';
import { changeGraphData } from '../../../redux/actions/GraphActions';
import { GraphPackage } from '../../../interfaces/GraphPackage';
import { Project } from '../../../interfaces/Project';

interface Props {
  project: Project;
  changeGraphData: (packages: GraphPackage[]) => void;
}

class OutlinerController extends Component<Props> {
  addPackageToProject = () => {
    this.props.changeGraphData(injectPackage(this.props.project, createPackage("Untitled")));
  }

  addGraphToPackage = () => {

  }

  render() {
    return (
      <div
        style={{
          paddingTop: 2,
          paddingLeft: 10,
          marginBottom: -8,
          fontSize: 12,
          display: "flex",
        }}
      >
        <div onClick={this.addPackageToProject} className="clickable" style={{ padding: 5, marginRight: 5 }}>
          <FontAwesomeIcon icon={faFolderPlus} />
        </div>
        <div onClick={this.addGraphToPackage} className="clickable" style={{ padding: 5, marginRight: 5 }}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="clickable" style={{ padding: 5, marginRight: 20 }}>
          <FontAwesomeIcon icon={faSync} />
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
  changeGraphData
}

export default connect(mapStateToProps, mapDispatchToProps)(OutlinerController);