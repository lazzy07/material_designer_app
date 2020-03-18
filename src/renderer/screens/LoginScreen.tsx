import React, { Component } from "react";
import { colors, defaultColors } from "../constants/Colors";
import InputBox from "../components/form/InputBox";
import Button from "../components/form/Button";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IpcMessages } from "../../IpcMessages";
import { ipcRenderer, remote } from "electron";

interface Props {}

interface State {
  send: {
    userName: string;
    password: string;
  };
  error: string;
  errorUserName: string;
  errorPassword: string;
  loading: boolean;
}

class LoginScreen extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      send: {
        userName: "",
        password: ""
      },
      loading: false,
      error: "",
      errorUserName: "",
      errorPassword: ""
    };
  }

  validateEmail = (email: string): boolean => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(email.toLowerCase());
  };

  onChange = (key: string, val: string) => {
    this.setState({
      send: { ...this.state.send, [key]: val },
      error: "",
      errorUserName: "",
      errorPassword: ""
    });
  };

  onBlurUsername = (val: string) => {
    if (val.length > 3) {
      return this.setState({ errorUserName: "" });
    }
    return this.setState({
      errorUserName: "Must be longer than 3 letters"
    });
  };

  onBlurPassword = (val: string) => {
    if (val.length > 5) {
      return this.setState({ errorPassword: "" });
    }

    return this.setState({
      errorPassword: "Must be atleast 6 characters long"
    });
  };

  startWithoutSignin = () => {
    this.loadEditorScreen();
  };

  loadEditorScreen = () => {
    ipcRenderer.send(IpcMessages.LOAD_EDITOR_PAGE);
    remote.getCurrentWindow().close();
  };

  render() {
    return (
      <div className="row">
        <div
          className="col-sm-6"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <img
            style={{ overflow: "hidden" }}
            height={window.innerHeight - 30}
            // width={"100%"}
            src={"https://picsum.photos/1200/800"}
            alt=""
          />
          <div
            style={{
              position: "absolute",
              top: 10,
              paddingLeft: 10,
              padding: 5,
              backgroundColor: defaultColors.DEFAULT_BACKGROUND_COLOR
            }}
          >
            <h6 style={{ margin: 0, padding: 0 }}>Artwork of the month</h6>
          </div>
          <div
            style={{
              backgroundColor: defaultColors.DEFAULT_BACKGROUND_COLOR,
              position: "absolute",
              paddingLeft: 20,
              paddingRight: 20,
              bottom: 10,
              left: 0
            }}
          >
            <div style={{ fontSize: 12, padding: 0, margin: 0 }}>
              Artwork by
            </div>
            <h5 style={{ margin: 0, padding: 0 }}>Lasantha Madushan</h5>
            <div style={{ fontSize: 14 }}>@lazzy07</div>
          </div>
        </div>
        <div
          className="col-sm-6"
          style={{ paddingTop: 40, position: "relative" }}
        >
          <h2>Let's start by Loging in,</h2>
          <div className="row" style={{ paddingTop: 50 }}>
            <div className="container col-sm-10 offset-sm-1">
              <InputBox
                value={this.state.send.userName}
                onChange={(key, val) => this.onChange(key, val)}
                id={"userName"}
                label="UserName/Email"
                placeHolder="Enter username or email"
                error={this.state.errorUserName}
                onBlur={() => this.onBlurUsername(this.state.send.userName)}
              />
            </div>
            <div
              className="container col-sm-10 offset-sm-1"
              style={{ paddingTop: 10 }}
            >
              <InputBox
                value={this.state.send.password}
                onChange={(key, val) => this.onChange(key, val)}
                id={"password"}
                label="Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                type="password"
                placeHolder="Enter password"
                error={this.state.errorPassword}
                onBlur={() => this.onBlurPassword(this.state.send.password)}
              />
            </div>
            <div
              className="container col-sm-10 offset-sm-1"
              style={{ paddingTop: 0 }}
            >
              <div style={{ padding: 10 }}>
                Forgot your password?{" "}
                <span
                  className="clickableText"
                  style={{ fontWeight: "bolder", cursor: "pointer" }}
                >
                  Click Here
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ marginRight: 15 }}>
                  <Button onClick={() => {}} title="Login" icon={faUser} />
                </div>
                <Button
                  icon={faSignInAlt}
                  onClick={() => this.props.history.push("/signup")}
                  title="Sign Up"
                  background="rgba(0,0,0,0)"
                />
              </div>
              <div
                style={{
                  marginTop: 20,
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bolder"
                }}
              >
                <p className="clickableText" onClick={this.startWithoutSignin}>
                  Start without signing in
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 20,
              display: "flex"
            }}
          >
            <img
              src="/main_window/dependencies/img/icon_trans.png"
              alt=""
              style={{ width: "50px", height: "40px", paddingRight: 10 }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <div style={{ fontSize: 12 }}>Material Designer</div>
              <div style={{ fontSize: 10 }}>Created by Cyborg Studios</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginScreen);
