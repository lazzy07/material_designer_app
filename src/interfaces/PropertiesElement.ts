import { PROPERTY_INPUT_TYPE } from "./GraphPropertyInputTypes";
import { PROPERTY_TYPE } from "./GraphPropertyTypes";

export interface PropertyElement<T> {
  propertyType: PROPERTY_TYPE;
  inputType: PROPERTY_INPUT_TYPE;
  data: T;
  isExposed: boolean;
}
