import { Transform } from "../packages/rete-1.4.4/view/area";
import { MOUSE_CONTROLLER_TYPE } from "./MouseControllerType";

export interface GraphSettings {
  graphConnectionCurvature: number;
  graphConnectionStrokeWidth: number;
  canvasSize: { x: number; y: number };
  startTransformPos: Transform;
  mouseControllerType: MOUSE_CONTROLLER_TYPE;
}
