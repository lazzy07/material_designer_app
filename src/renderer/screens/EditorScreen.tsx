import React, { Component } from "react";
import Loading from "../components/Loading";
import { startKeyboardListners } from "../listners/editor_listners/EditorKeyboardListners";
import BottomStatus from "../components/editor_page/BottomStatus";

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
    return (
      <div
        style={{
          height: window.innerHeight - 30,
          width: "100%"
        }}
      >
        <div>
          <BottomStatus />
        </div>
      </div>
    );
  }
}
