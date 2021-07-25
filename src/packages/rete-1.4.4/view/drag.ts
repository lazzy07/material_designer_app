import { store } from "../../../redux/store";
import { listenWindow } from "./utils";

export class Drag {
  pointerStart: [number, number] | null;
  el: HTMLElement;
  destroy: () => void;
  isArea: boolean = false;

  constructor(
    el: HTMLElement,
    private onTranslate = (_x: number, _y: number, _e: PointerEvent) => {},
    private onStart = (_e: PointerEvent) => {},
    private onDrag = (_e: PointerEvent) => {},
    isArea?: boolean
  ) {
    this.pointerStart = null;
    this.el = el;
    this.isArea = !!isArea;
    this.el.style.touchAction = "none";
    this.el.addEventListener("pointerdown", this.down.bind(this));

    const destroyMove = listenWindow("pointermove", this.move.bind(this));
    const destroyUp = listenWindow("pointerup", this.up.bind(this));

    this.destroy = () => {
      destroyMove();
      destroyUp();
    };
  }

  down(e: PointerEvent) {
    if (this.isArea) {
      if (
        store.getState().preferences.graphSettings.mouseControllerType ===
        "mouse"
      ) {
        if (e.pointerType === "mouse" && e.button !== 1) return;
      } else {
        if (e.pointerType === "mouse" && e.button !== 0) return;
      }
    } else {
      if (e.pointerType === "mouse" && e.button !== 0) return;
    }

    e.stopPropagation();
    this.pointerStart = [e.pageX, e.pageY];

    this.onStart(e);
  }

  move(e: PointerEvent) {
    if (!this.pointerStart) return;
    e.preventDefault();

    let [x, y] = [e.pageX, e.pageY];

    let delta = [x - this.pointerStart[0], y - this.pointerStart[1]];

    let zoom = this.el.getBoundingClientRect().width / this.el.offsetWidth;

    this.onTranslate(delta[0] / zoom, delta[1] / zoom, e);
  }

  up(e: PointerEvent) {
    if (!this.pointerStart) return;

    this.pointerStart = null;
    this.onDrag(e);
  }
}
