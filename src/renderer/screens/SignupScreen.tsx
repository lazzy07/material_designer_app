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
    confirmPassword: string;
  };
  error: {
    main: string;
    firstName: string;
    lastName: string;
    password: string;
    userName: string;
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
        email: "",
        confirmPassword: ""
      },
      error: {
        main: "",
        firstName: "",
        lastName: "",
        password: "",
        userName: "",
        confirmPassword: "",
        email: ""
      }
    };
  }

  onChange = (key: string, val: string) => {
    this.setState({
      send: { ...this.state.send, [key]: val },
      error: { ...this.state.error, [key]: "", main: "" }
    });
  };

  addError = (to: string, error: string): null => {
    this.setState({
      error: {
        ...this.state.error,
        [to]: error,
        main: error
      }
    });
    return null;
  };

  validateEmail = (email: string): boolean => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(email.toLowerCase());
  };

  validateSignup = (
    fName: string,
    lName: string,
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): object | null => {
    if (fName.length > 0) {
      if (lName.length > 0) {
        if (userName.length >= 4) {
          if (userName.match("^[A-z0-9]+$")) {
            if (this.validateEmail(email)) {
              if (password.length >= 6) {
                if (password === confirmPassword) {
                  return this.state.send;
                } else {
                  return this.addError(
                    "confirmPassword",
                    "Paswords didn't match"
                  );
                }
              } else {
                return this.addError(
                  "password",
                  "Password must be atleast 6 characters long"
                );
              }
            } else {
              return this.addError("email", "Please enter a valid email");
            }
          } else {
            return this.addError(
              "userName",
              "Username can only contain numbers and letters"
            );
          }
        } else {
          return this.addError(
            "userName",
            "Username must be atleast 4 characters long"
          );
        }
      } else {
        return this.addError("lastName", "Last name can't be empty");
      }
    } else {
      return this.addError("firstName", "First name can't be empty");
    }
  };

  signUp = () => {
    this.setState({
      error: {
        main: "",
        firstName: "",
        lastName: "",
        password: "",
        userName: "",
        confirmPassword: "",
        email: ""
      }
    });

    this.validateSignup(
      this.state.send.firstName,
      this.state.send.lastName,
      this.state.send.userName,
      this.state.send.email,
      this.state.send.password,
      this.state.send.confirmPassword
    );
  };

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
                value={this.state.send.firstName}
                onChange={(key, val) => {
                  this.onChange(key, val);
                }}
                id={"firstName"}
                label="First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                placeHolder="Enter first name"
                error={this.state.error.firstName}
              />
            </div>
            <div>
              <InputBox
                value={this.state.send.lastName}
                onChange={(key, val) => this.onChange(key, val)}
                id={"lastName"}
                label="Last Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                placeHolder="Enter last name"
                error={this.state.error.lastName}
              />
            </div>
            <div>
              <InputBox
                value={this.state.send.userName}
                onChange={(key, val) => this.onChange(key, val)}
                id={"userName"}
                label="User Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                placeHolder="Enter user name"
                error={this.state.error.userName}
              />
            </div>
            <div>
              <InputBox
                value={this.state.send.email}
                onChange={(key, val) => this.onChange(key, val)}
                id={"email"}
                label="Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                placeHolder="Enter a valid email"
                error={this.state.error.email}
              />
            </div>
            <div>
              <InputBox
                value={this.state.send.password}
                type="password"
                onChange={(key, val) => this.onChange(key, val)}
                id={"password"}
                label="Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                placeHolder="Enter a password (min of 6)"
                error={this.state.error.password}
              />
            </div>
            <div>
              <InputBox
                value={this.state.send.confirmPassword}
                onChange={(key, val) => this.onChange(key, val)}
                id={"confirmPassword"}
                label="Confirm Password"
                placeHolder="Type the password again"
                error={this.state.error.confirmPassword}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ paddingRight: 10 }}>
                <Button
                  title="Signup"
                  onClick={() => this.signUp()}
                  icon={faSignInAlt}
                />
              </div>
              <Button
                title="Go back to Login"
                onClick={() => this.props.history.push("/")}
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
