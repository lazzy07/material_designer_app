import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faLaptopCode,
  faCloud,
  faUserTag,
  faFolderOpen,
  faFileImport,
  faTimesCircle,
  faFileExcel
} from "@fortawesome/free-solid-svg-icons";
import { defaultColors } from "../constants/Colors";
import Sidebar, { SidebarMenu } from "../components/sidebar/Sidebar";
import ProjectFileElement from "../components/project_file/ProjectFileElement";
import Button from "../components/form/Button";
import { getStaticPath } from "./../services/StaticAssetResolver";
import { remote } from "electron";
import RecentProjects from "../services/RecentProjects";
import { openProjectFromFile } from "./../services/OpenProject";

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
  recentSelectedLocal: number;
  recentSelectedCloud: number;
}

export default class OpenProjectScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      sideMenu,
      recentSelectedCloud: -1,
      recentSelectedLocal: -1
    };
  }

  setSelected = (selected: string) => {
    let menu = { ...this.state.sideMenu, selected };
    this.setState({
      sideMenu: menu,
      recentSelectedCloud: -1,
      recentSelectedLocal: -1
    });
  };

  //TODO:: Add webguard
  browseFiles = () => {
    remote.dialog
      .showOpenDialog(remote.getCurrentWindow(), {
        properties: ["openFile"],
        filters: [{ name: "Material project", extensions: ["matproj"] }]
      })
      .then(val => {
        if (!val.canceled) {
          openProjectFromFile(val.filePaths[0]);
        }
      })
      .catch(err => {
        //TODO:: Handle Error
        console.log(err);
      });
  };

  setRecentSelected = (type: "local" | "cloud", index: number) => {
    if (type === "local") {
      this.setState({ recentSelectedLocal: index, recentSelectedCloud: -1 });
    } else {
      this.setState({ recentSelectedLocal: -1, recentSelectedCloud: index });
    }
  };

  renderLocalFiles = () => {
    RecentProjects.initSavedData();

    const localFiles = RecentProjects.getData();

    return (
      <div style={{ overflowY: "auto" }}>
        {localFiles.length > 0 ? (
          localFiles.map((ele, index) => {
            return (
              <div
                key={index}
                onClick={() => this.setRecentSelected("local", index)}
                onDoubleClick={() => console.log("Double Click")}
              >
                <ProjectFileElement
                  selected={index === this.state.recentSelectedLocal}
                  file={ele}
                />
              </div>
            );
          })
        ) : (
          <div
            style={{
              height: "300px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <FontAwesomeIcon
                icon={faFileExcel}
                style={{ fontSize: "70px" }}
              />
              <h5>No recent files</h5>
            </div>
          </div>
        )}
      </div>
    );
  };

  //TODO:: Add webguard
  closeProjectScreen = () => {
    const window = remote.getCurrentWindow();
    window.close();
  };

  renderCloudFiles = () => {
    return <div style={{ overflowY: "auto" }}>cloud files</div>;
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
            <div
              style={{
                position: "absolute",
                left: 30,
                bottom: 10,
                display: "flex"
              }}
            >
              <img
                src={getStaticPath("/dependencies/img/icon_trans.png")}
                alt=""
                width="30px"
              />
              <div
                style={{
                  width: "100%",
                  transform: "translate(0, 25%)",
                  paddingLeft: 10,
                  height: 30
                }}
              >
                <h6>Material Designer</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-8" style={{ overflow: "hidden" }}>
            <h4
              style={{
                color: defaultColors.IMPORTANT_FONT_COLOR,
                paddingBottom: 10,
                paddingTop: 10
              }}
            >
              <FontAwesomeIcon icon={faFile} />
              {"  "}
              Open {this.state.sideMenu.selected} Project
            </h4>
            <div
              style={{
                width: "95%",
                height: "330px",
                overflowY: "auto"
              }}
            >
              {this.renderFiles()}
            </div>
            <div
              style={{
                paddingTop: 20,
                paddingRight: 20,
                display: "flex",
                width: "100%",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <Button
                  disabled={
                    this.state.recentSelectedLocal === -1 &&
                    this.state.recentSelectedCloud === -1
                  }
                  icon={faFileImport}
                  title="Open"
                  onClick={() => {}}
                />
              </div>
              {/* <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <Button
                  icon={faFolderPlus}
                  title="New project"
                  onClick={() => {}}
                />
              </div> */}
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <Button
                  icon={faFolderOpen}
                  title="Browse"
                  onClick={() => this.browseFiles()}
                />
              </div>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <Button
                  icon={faTimesCircle}
                  title="Close"
                  onClick={this.closeProjectScreen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
