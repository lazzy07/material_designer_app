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
} from "../actions/GraphActions";
import { Data } from "../../packages/rete-1.4.4/core/data";
import { Graphs } from "../../interfaces/Graphs";

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
      const toUpdate: Data = { ...action.payload.packageData };
      const newNodes = toUpdate.nodes;
      const id = action.payload.id;
      const pkg = state.packages[id];
      const prevData: Data = {
        ...pkg[action.payload.selectedType!].data,
      };
      const prevNodes = prevData.nodes;

      for (const i of Object.keys(newNodes)) {
        if (!prevNodes[i]) {
          prevNodes[i] = { ...newNodes[i] };
        }
      }
      return {
        ...state,
        packages: {
          ...state.packages,
          [id]: {
            ...state.packages[id],
            [action.payload.selectedType!]: {
              ...state.packages[id][action.payload.selectedType!],
              data: prevData,
            },
          },
        },
      };

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
