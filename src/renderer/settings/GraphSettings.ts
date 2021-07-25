import { MOUSE_CONTROLLER_TYPE } from "./../../interfaces/MouseControllerType";
import { Transform } from "../../packages/rete-1.4.4/view/area";

interface GraphSettingsInterface {
  graphConnectionCurvature: number;
  graphConnectionStrokeWidth: number;
  canvasSize: { x: number; y: number };
  startTransformPos: Transform;
  mouseControllerType: MOUSE_CONTROLLER_TYPE;
}

let GraphSettings: GraphSettingsInterface = {
  graphConnectionCurvature: 0.4,
  graphConnectionStrokeWidth: 2,
  canvasSize: { x: 1000000, y: 1000000 },
  startTransformPos: {
    x: -1000000 / 4,
    y: -1000000 / 4,
    k: 0.5,
  },
  mouseControllerType: "mouse",
};

// export default GraphSettings;
