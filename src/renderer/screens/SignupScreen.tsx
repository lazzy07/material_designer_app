import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import InputBox from "../components/form/InputBox";
import Button from "../components/form/Button";
import { faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {}

interface State {
  send: {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  };
  confirm: {
    password: string;
  };
  error: {
    main: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
  };
}

class SignupScreen extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      send: {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        email: ""
      },
      confirm: {
        password: ""
      },
      error: {
        main: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: ""
      }
    };
  }

  onChange = (key: string, val: string) => {};

  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <img
            src="/main_window/dependencies/img/icon_trans.png"
            alt=""
            style={{
              width: "100%",
              paddingLeft: 100,
              paddingRight: 100,
              paddingTop: 100
            }}
          />
          <div style={{ width: "100%", textAlign: "center" }}>
            <h1>Material Designer</h1>
            <div>Texture designer and online texture delivery system</div>
          </div>
        </div>
        <div className="col-sm-6">
          <div style={{ textAlign: "center", width: "100%", paddingTop: 20 }}>
            <h2>Let's Signup</h2>
          </div>
          <div>
            <div>
              <InputBox
                value={""}
                onChange={(key, val) => this.onChange(key, val)}
                id={"firstName"}
                label="First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                placeHolder="Enter first name"
                error={""}
              />
            </div>
            <div>
              <InputBox
                value={""}
                onChange={(key, val) => this.onChange(key, val)}
                id={"lastName"}
                label="Last Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                placeHolder="Enter last name"
                error={""}
              />
            </div>
            <div>
              <InputBox
                value={""}
                onChange={(key, val) => this.onChange(key, val)}
                id={"userName"}
                label="User Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                placeHolder="Enter user name"
                error={""}
              />
            </div>
            <div>
              <InputBox
                value={""}
                onChange={(key, val) => this.onChange(key, val)}
                id={"email"}
                label="Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                placeHolder="Enter a valid email"
                error={""}
              />
            </div>
            <div>
              <InputBox
                value={""}
                onChange={(key, val) => this.onChange(key, val)}
                id={"password"}
                label="Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                placeHolder="Enter a password (min of 6)"
                error={""}
              />
            </div>
            <div>
              <InputBox
                value={""}
                onChange={(key, val) => this.onChange(key, val)}
                id={"confirmPassword"}
                label="Confirm Password"
                placeHolder="Type the password again"
                error={""}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ paddingRight: 10 }}>
                <Button title="Signup" onClick={() => {}} icon={faSignInAlt} />
              </div>
              <Button
                title="Go back to Login"
                onClick={() => {}}
                icon={faUser}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupScreen);
