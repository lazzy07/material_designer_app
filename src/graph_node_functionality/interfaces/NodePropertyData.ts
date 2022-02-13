import { PROPERTY_INPUT_TYPE } from "../../interfaces/GraphPropertyInputTypes";
import { PROPERTY_TYPE } from "../../interfaces/GraphPropertyTypes";
import { NodePropertyGroup } from "./NodePropertyGroup";

export interface NodePropertyData<T> {
  id: string;
  name: string;
  groups: NodePropertyGroup;
  type: any;
  inputType: PROPERTY_INPUT_TYPE;
  dataType: PROPERTY_TYPE;
  data: T;
  disabled?: boolean;
  isHidden?: boolean;
}
