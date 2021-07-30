import React from "react";
import ReactDOM from "react-dom";
import "./GoldenLayoutDependencies";
import GoldenLayout, { Config } from "golden-layout";
import "golden-layout/src/css/goldenlayout-base.css";
import "../../../scss/DarkTheme.scss";
import $ from "jquery";
import { IS_WEB } from "../../../services/Webguard";
import { IpcMessages } from "./../../../../IpcMessages";
import { v4 } from "uuid";
import { getElement } from "../../../../EditorElements";
import { ElementsToLocalStorage } from "./../../../../EditorElements/ElementsToLocalStorage";

export class GoldenLayoutComponent extends React.Component<any, any> {
  state: any = {};
  containerRef: any = React.createRef();
  goldenLayoutInstance: GoldenLayout | undefined = undefined;

  render() {
    let panels: any = Array.from(this.state.renderPanels || []);
    return (
      <div
        style={this.props.htmlAttrs.style}
        ref={this.containerRef}
        {...this.props.htmlAttrs}
      >
        {panels.map((panel, index) => {
          return ReactDOM.createPortal(
            panel._getReactComponent(),
            panel._container.getElement()[0]
          );
        })}
      </div>
    );
  }

  componentRender(reactComponentHandler) {
    this.setState((state) => {
      let newRenderPanels = new Set(state.renderPanels);
      newRenderPanels.add(reactComponentHandler);
      return { renderPanels: newRenderPanels };
    });
  }
  componentDestroy(reactComponentHandler) {
    this.setState((state) => {
      let newRenderPanels = new Set(state.renderPanels);
      newRenderPanels.delete(reactComponentHandler);
      return { renderPanels: newRenderPanels };
    });
  }

  menubarListener = () => {
    window.addEventListener("addNewTab", (e: CustomEventInit) => {
      if (this.goldenLayoutInstance?.selectedItem) {
        this.goldenLayoutInstance?.selectedItem.addChild(e.detail.element);
      } else {
        this.goldenLayoutInstance?.root.contentItems[0].addChild(
          e.detail.element
        );
      }
    });
  };

  appMainConfigurations = () => {
    const ipcRenderer = require("electron").ipcRenderer;

    this.goldenLayoutInstance!.on("stateChanged", () => {
      const state = JSON.stringify(this.goldenLayoutInstance?.toConfig());
      localStorage.setItem("mainConfig", state);
      ipcRenderer.send(IpcMessages.UPDATE_TITLEBAR);
    });

    ipcRenderer.on(IpcMessages.SUB_DATA_TO_MAIN, (event, args) => {
      if (this.goldenLayoutInstance?.selectedItem) {
        this.goldenLayoutInstance?.selectedItem.addChild(args);
      } else {
        this.goldenLayoutInstance?.root.contentItems[0].addChild(args);
      }
    });
  };

  appSubEditorConfigurations = (screenId: string) => {
    const ipcRenderer = require("electron").ipcRenderer;

    this.goldenLayoutInstance!.on("stateChanged", () => {
      ElementsToLocalStorage.updateData(
        screenId,
        this.goldenLayoutInstance?.toConfig()
      );

      ipcRenderer.send(IpcMessages.UPDATE_TITLEBAR);
    });
  };

  popinButtonArithmetic = (
    popinButton: JQuery<HTMLElement>,
    screenId: string,
    stack: any
  ) => {
    $(popinButton).on("click", () => {
      const ipcRenderer = require("electron").ipcRenderer;
      ipcRenderer.send(
        IpcMessages.SUB_EDITOR_TO_MAIN,
        getElement(stack._activeContentItem.config.title)
      );
      ElementsToLocalStorage.removeData(screenId);
      const remote = require("electron").remote;
      remote.getCurrentWindow().close();
    });
  };

  popoutButtonArithmetic = (
    popoutButton: JQuery<HTMLElement>,
    screenId: string,
    stack: any
  ) => {
    $(popoutButton).on("click", () => {
      if (!IS_WEB) {
        const ipcRenderer = require("electron").ipcRenderer;
        const id = v4();
        const layout: Config = {
          content: [
            {
              type: "row",
              content: [
                {
                  ...getElement(stack._activeContentItem.config.title)!,
                },
              ],
            },
          ],
          settings: {
            showPopoutIcon: false,
            constrainDragToContainer: false,
          },
        };
        ElementsToLocalStorage.addData(id, layout);
        ipcRenderer.send(IpcMessages.OPEN_SUB_EDITOR_PAGE, {
          id,
          layout,
        });
      }
      stack._activeContentItem.remove();
    });
  };

  onStackCreated = (stack: any) => {
    const popoutButton = $('<li class="lm_popout"></li>');
    const popinButton = $('<li class="lm_popout"></li>');

    const lastPart = window.location.href.split("?")[1];
    const screenId = lastPart.split("&")[1];
    if (!this.props.noPopout) {
      if (!screenId || screenId === "main")
        stack.header.controlsContainer.prepend(popoutButton);
      else stack.header.controlsContainer.prepend(popinButton);

      this.popinButtonArithmetic(popinButton, screenId, stack);

      this.popoutButtonArithmetic(popoutButton, screenId, stack);
    }
  };

  componentDidMount() {
    this.goldenLayoutInstance = new GoldenLayout(
      this.props.config || {},
      this.containerRef.current
    );

    if (this.props.registerComponents instanceof Function)
      this.props.registerComponents(this.goldenLayoutInstance);

    (this.goldenLayoutInstance as any).reactContainer = this;
    this.goldenLayoutInstance.init();

    //dock back to main
    if (!IS_WEB && this.goldenLayoutInstance) {
      const lastPart = window.location.href.split("?")[1];
      const screenId = lastPart.split("&")[1];

      if (!screenId || screenId === "main") {
        this.menubarListener();
        this.appMainConfigurations();
      } else {
        this.appSubEditorConfigurations(screenId);
      }
    }

    if (!IS_WEB && this.goldenLayoutInstance) {
      this.goldenLayoutInstance.on("stackCreated", (stack) => {
        this.onStackCreated(stack);
      });
    }
  }
}

//Patching internal GoldenLayout.__lm.utils.ReactComponentHandler:

const ReactComponentHandler = GoldenLayout["__lm"].utils.ReactComponentHandler;

class ReactComponentHandlerPatched extends ReactComponentHandler {
  _container: any;
  _reactClass: any;
  _render() {
    var reactContainer = this._container.layoutManager.reactContainer; //Instance of GoldenLayoutComponent class
    if (reactContainer && reactContainer.componentRender)
      reactContainer.componentRender(this);
  }
  _destroy() {
    //ReactDOM.unmountComponentAtNode( this._container.getElement()[ 0 ] );
    this._container.off("open", this._render, this);
    this._container.off("destroy", this._destroy, this);
  }

  _getReactComponent() {
    //the following method is absolute copy of the original, provided to prevent depenency on window.React
    var defaultProps = {
      glEventHub: this._container.layoutManager.eventHub,
      glContainer: this._container,
    };
    var props = $.extend(defaultProps, this._container._config.props);
    return React.createElement(this._reactClass, props);
  }
}

GoldenLayout["__lm"].utils.ReactComponentHandler = ReactComponentHandlerPatched;
