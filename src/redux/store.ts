import {
  triggerAlias,
  forwardToRenderer,
  replayActionMain,
  getInitialStateRenderer,
  forwardToMain,
  replayActionRenderer,
} from "electron-redux";
import {
  createStore,
  applyMiddleware,
  Store,
  compose,
  CombinedState,
} from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";

export interface Action {
  type: string;
  payload: any;
}

let initialState = {};

export let store: any;

export const rendererStore = (): Store => {
  const initialState = getInitialStateRenderer();

  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(forwardToMain, thunk),
      ((window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose
    )
  );

  replayActionRenderer(store);

  return store;
};

export const mainStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(triggerAlias, thunk, forwardToRenderer)
  );

  replayActionMain(store);

  return store;
};
