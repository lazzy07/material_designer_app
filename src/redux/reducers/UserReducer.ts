import { Action } from "../store";
import { Image } from "../../interfaces/Image";

export interface UserReducer {
  userName: string;
  firstName: string;
  lastName: string;
  profilePicture: Image | undefined;
  sessionId: string;
}

const initialState: UserReducer = {
  userName: "",
  firstName: "",
  lastName: "",
  profilePicture: undefined,
  sessionId: ""
};

export const userReducer = (
  state = initialState,
  action: Action
): UserReducer => {
  switch (action.type) {
    default:
      return state;
  }
};
