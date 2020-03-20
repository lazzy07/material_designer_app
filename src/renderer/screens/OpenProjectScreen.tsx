import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faLaptopCode,
  faCloud,
  faUserTag
} from "@fortawesome/free-solid-svg-icons";
import { defaultColors } from "../constants/Colors";
import Sidebar, { SidebarMenu } from "../components/sidebar/Sidebar";
import { ProjectFile } from "src/interfaces/ProjectFile";
import ProjectFileElement from "../components/project_file/ProjectFileElement";

const localFiles: ProjectFile[] = [
  {
    filePath:
      "C:/documents and settings/lazzy07/material/first project.matproj",
    lastModiied: Date.now(),
    type: "local"
  },
  {
    filePath:
      "C:/documents and settings/lazzy07/material/second project.matproj",
    lastModiied: Date.now(),
    type: "local"
  }
];

const sideMenu: SidebarMenu = {
  title: "Open File",
  selected: "Local",
  menus: [
    {
      icon: faLaptopCode,
      title: "Projects in PC",
      onClick: () => {},
      submenu: [
        {
          icon: faFile,
          title: "Local",
          onClick: () => {},
          submenu: [],
          clickable: true
        }
      ]
    },
    {
      icon: faCloud,
      title: "Cloud Projects",
      onClick: () => {},
      submenu: [
        {
          icon: faUserTag,
          title: "Personal",
          onClick: () => {},
          submenu: [],
          clickable: true
        }
      ]
    }
  ]
};

interface Props {}

interface State {
  sideMenu: SidebarMenu;
}

export default class OpenProjectScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      sideMenu
    };
  }

  setSelected = (selected: string) => {
    let menu = { ...this.state.sideMenu, selected };
    this.setState({ sideMenu: menu });
  };

  renderLocalFiles = () => {
    return (
      <div>
        {localFiles.map((ele, index) => {
          return <ProjectFileElement file={ele} key={index} />;
        })}
      </div>
    );
  };

  renderCloudFiles = () => {
    return <div>cloud files</div>;
  };

  renderFiles = () => {
    if (this.state.sideMenu.selected === "Local") {
      return this.renderLocalFiles();
    } else {
      return this.renderCloudFiles();
    }
  };

  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="row">
          <div
            className="col-sm-4"
            style={{
              height: window.innerHeight - 30,
              backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
              paddingLeft: 40,
              paddingTop: 20
            }}
          >
            <Sidebar
              setSelected={this.setSelected}
              menu={this.state.sideMenu}
            />
          </div>
          <div className="col-sm-8" style={{ padding: 10 }}>
            <h4 style={{ color: defaultColors.IMPORTANT_FONT_COLOR }}>
              <FontAwesomeIcon icon={faFile} />
              {"  "}
              Open {this.state.sideMenu.selected} Project
            </h4>
            <div
              style={{
                width: "95%",
                minHeight: "70%"
              }}
            >
              {this.renderFiles()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
