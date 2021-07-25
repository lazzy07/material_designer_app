import { store } from "../../redux/store";
import { getNodeConnectionColors } from "../../renderer/services/NodeColors";
import { Emitter, Connection, Input, Output } from "../rete-1.4.4";
import { EventsTypes } from "../rete-1.4.4/events";

function toTrainCase(str: string) {
  return str.toLowerCase().replace(/ /g, "-");
}

export function getMapItemRecursively<T extends any>(
  map: WeakMap<Element, T>,
  el: Element
): T | null {
  return (
    map.get(el) ||
    (el.parentElement ? getMapItemRecursively(map, el.parentElement) : null)
  );
}

export function defaultPath(points: number[], curvature: number) {
  const [x1, y1, x2, y2] = points;
  const hx1 = x1 + Math.abs(x2 - x1) * curvature;
  const hx2 = x2 - Math.abs(x2 - x1) * curvature;

  return `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`;
}

export function renderPathData(
  emitter: Emitter<EventsTypes>,
  points: number[],
  connection?: Connection
) {
  const data = { points, connection, d: "" };
  emitter.trigger("connectionpath", data);

  return (
    data.d ||
    defaultPath(
      points,
      store.getState().preferences.graphSettings.graphConnectionCurvature
    )
  );
}

export function updateConnection({ el, d }: { el: HTMLElement; d: string }) {
  const path = el.querySelector(".connection path");

  if (!path) throw new Error("Path of connection was broken");

  path.setAttribute("d", d);
}

export function renderConnection({
  el,
  d,
  io,
  connection,
}: {
  el: HTMLElement;
  d: string;
  io?: Input | Output;
  connection?: Connection;
}) {
  const classed = !connection
    ? []
    : [
        "input-" + toTrainCase(connection.input.name),
        "output-" + toTrainCase(connection.output.name),
        "socket-input-" + toTrainCase(connection.input.socket.name),
        "socket-output-" + toTrainCase(connection.output.socket.name),
      ];

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  svg.classList.add("connection", ...classed);
  path.classList.add("main-path");

  if (io) path.style.stroke = getNodeConnectionColors(io.key as any);
  if (connection)
    path.style.stroke = getNodeConnectionColors(connection.input.key as any);

  path.style.strokeWidth =
    store
      .getState()
      .preferences.graphSettings.graphConnectionStrokeWidth.toString() + "px";
  path.setAttribute("d", d);

  svg.appendChild(path);
  el.appendChild(svg);

  updateConnection({ el, d });
}
