import React from "react";
import ReactDOM from "react-dom";
import "./GoldenLayoutDependencies";
import GoldenLayout from "golden-layout";
import "golden-layout/src/css/goldenlayout-base.css";
import "../../../scss/DarkTheme.scss";
import $ from "jquery";
import { IS_WEB } from "../../../services/Webguard";

export class GoldenLayoutComponent extends React.Component<any, any> {
  state: any = {};
  containerRef: any = React.createRef();

  render() {
    let panels: any = Array.from(this.state.renderPanels || []);
    return (
      <div ref={this.containerRef} {...this.props.htmlAttrs}>
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
    this.setState(state => {
      let newRenderPanels = new Set(state.renderPanels);
      newRenderPanels.add(reactComponentHandler);
      return { renderPanels: newRenderPanels };
    });
  }
  componentDestroy(reactComponentHandler) {
    this.setState(state => {
      let newRenderPanels = new Set(state.renderPanels);
      newRenderPanels.delete(reactComponentHandler);
      return { renderPanels: newRenderPanels };
    });
  }

  goldenLayoutInstance: GoldenLayout | undefined = undefined;

  componentDidMount() {
    this.goldenLayoutInstance = new GoldenLayout(
      this.props.config || {},
      this.containerRef.current
    );

    if (this.props.registerComponents instanceof Function)
      this.props.registerComponents(this.goldenLayoutInstance);
    (this.goldenLayoutInstance as any).reactContainer = this;
    this.goldenLayoutInstance.init();

    if (!IS_WEB && this.goldenLayoutInstance) {
      this.goldenLayoutInstance.on("stackCreated", stack => {
        const popoutButton = $('<li class="lm_popout"></li>');

        stack.header.controlsContainer.prepend(popoutButton);

        $(popoutButton).on("click", () => {
          console.log("clicked");
        });
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
      glContainer: this._container
    };
    var props = $.extend(defaultProps, this._container._config.props);
    return React.createElement(this._reactClass, props);
  }
}

GoldenLayout["__lm"].utils.ReactComponentHandler = ReactComponentHandlerPatched;
