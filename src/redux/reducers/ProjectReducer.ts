import { EDIT_GRAPH_DATA } from "./../actions/GraphActions";
import { Project } from "src/interfaces/Project";
import { initialProjectData } from "./../../renderer/project_data/InitialProjectData";
import { Action } from "./../store";
import {
  CHANGE_PROJECT_SETTING,
  OPEN_PROJECT,
} from "../actions/ProjectActions";
import {
  CHANGE_GRAPHS,
  EDIT_GRAPH_NODE_DATA,
  EDIT_KERNEL_DATA,
  CREATE_CONNECTION,
  REMOVE_CONNECTION,
} from "../actions/GraphActions";
import { Data } from "../../packages/rete-1.4.4/core/data";
import { Graphs } from "../../interfaces/Graphs";
import { Connection } from "../../packages/rete-1.4.4";

export interface ProjectReducer extends Project {
  modifiedAt: number;
  savedAt: number;
}

const initState: ProjectReducer = {
  ...initialProjectData(),
  modifiedAt: Date.now(),
  savedAt: Date.now(),
};

export const projectReducer = (
  state = initState,
  action: Action
): ProjectReducer => {
  switch (action.type) {
    case OPEN_PROJECT:
      return { ...action.payload };

    case CHANGE_GRAPHS:
      return {
        ...state,
        packages: { ...action.payload.packages },
        tree: [...action.payload.tree],
      };

    case EDIT_GRAPH_DATA:
      const id = action.payload.id;
      return {
        ...state,
        packages: {
          ...state.packages,
          [id]: {
            ...state.packages[id],
            [action.payload.selectedType!]: {
              ...action.payload.packageData,
            },
          },
        },
      };

    case CREATE_CONNECTION: {
      const id = action.payload.id;
      const connection: Connection = { ...action.payload.connection };

      return {
        ...state,
        packages: {
          ...state.packages,
          [id]: {
            ...state.packages[id],
            [action.payload.selectedType!]: {
              ...state.packages[id][action.payload.selectedType!],
              connections: {
                ...state.packages[id][action.payload.selectedType!].connections,
                [connection.id]: connection,
              },
            },
          },
        },
      };
    }

    case REMOVE_CONNECTION: {
      const id = action.payload.id;
      const connection: Connection = { ...action.payload.connection };
      const connections = {
        ...state.packages[id][action.payload.selectedType].connections,
      };
      delete connections[connection.id];
      console.log(connections);

      return {
        ...state,
        packages: {
          ...state.packages,
          [id]: {
            ...state.packages[id],
            [action.payload.selectedType!]: {
              ...state.packages[id][action.payload.selectedType!],
              connections,
            },
          },
        },
      };
    }

    case EDIT_GRAPH_NODE_DATA: {
      const id = action.payload.id;
      return {
        ...state,
        packages: {
          ...state.packages,
          [id]: {
            ...state.packages[id],
            [action.payload.selectedType!]: {
              ...state.packages[id][action.payload.selectedType!],
              data: {
                ...state.packages[id][action.payload.selectedType!].data,
                nodes: {
                  ...state.packages[id][action.payload.selectedType!].data
                    .nodes,
                  [action.payload.selectedNode]: action.payload.data,
                },
              },
            },
          },
        },
      };
    }

    case EDIT_KERNEL_DATA: {
      const id = action.payload.id;
      return {
        ...state,
        packages: {
          ...state.packages,
          [id]: {
            ...state.packages[id],
            kernelGraph: {
              ...(state.packages[id] as Graphs).kernelGraph!,
              data: {
                ...(state.packages[id] as Graphs).kernelGraph!.data,
                [action.payload.type]: action.payload.update,
              },
            },
          },
        },
      };
    }

    case CHANGE_PROJECT_SETTING:
      const settings = [...state.settings];

      if (action.payload.isDropdown) {
        settings[action.payload.index].data.value = action.payload.value;
      } else {
        settings[action.payload.index].data = action.payload.value;
      }

      return {
        ...state,
        settings,
      };

    default:
      return state;
  }
};
