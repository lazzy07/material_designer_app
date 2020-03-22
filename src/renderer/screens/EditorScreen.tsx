import React, { Component } from "react";
import Loading from "../components/Loading";
import { startKeyboardListners } from "../listners/editor_listners/EditorKeyboardListners";

interface Props {}

interface State {
  loading: boolean;
}

export default class EditorScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount = () => {
    startKeyboardListners();
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div
          style={{
            minHeight: "80vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          <Loading />
        </div>
      );
    }
    return <div>Main Screen</div>;
  }
}
