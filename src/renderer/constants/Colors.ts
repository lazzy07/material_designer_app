import styles from "../scss/colors.scss";

export let colors = {
  ...styles,
};

export const defaultColors = {
  DEFAULT_BACKGROUND_COLOR: "#293538",
  IMPORTANT_BACKGROUND_COLOR: "#20292b",
  FONT_COLOR: "#b3b6b6",
  IMPORTANT_FONT_COLOR: "#cfd5d6",
  DISABLED_FONT_COLOR: "#5a6f72",
  ERROR_COLOR: "#e8232d",
  PRIMARY_COLOR: "#009688",
  HOVER_COLOR: "#5a6f72",
  BORDER_COLOR: "#364346",

  GENERATOR_COLOR: "#e91e63",
  GENERATOR_GRAYSCALE: "#8bc34a",
  PROCESS_COLOR: "#ff5722",
  PROCESS_GRAYSCALE: "#00bcd4",
  OUTPUT_COLOR: "#673ab7",
  OUTPUT_GRAYSCALE: "#f44336",
  GRAPH_EDITOR_BACKGRUND_COLOR: "#2d3a3d",
  GRAPH_EDITOR_GRID_COLOR: "#364346",
  NODE_HEADER_FONT_COLOR: "#ffffff",
  GRAYSCALE_CONNETION_COLOR: "#b3b6b6",
  COLOR_CONNECTION_COLOR: "#ffa500",
  FLOAT_CONECTION_COLOR: "#8bc34a",
  INT_CONNECTION_COLOR: "#e91e63",
  COLORPICK_CONNECTION_COLOR: "#ff5722",
  FLOATVEC2_CONNECTION_COLOR: "#00bcd4",
  INTVEC2_CONNECTION_COLOR: "#673ab7",
};

export class ThemeManager {
  static initTheme = () => {
    localStorage.getItem("theme");
  };

  static setColor = (key: string, val: string) => {
    defaultColors[key] = val;
    const r = document.querySelector(":root");

    if (r) {
      (r as any).style.setProperty("--" + key, val);
    }
  };

  static saveTheme = () => {
    localStorage.setItem("theme", JSON.stringify(colors));
  };

  static loadThemeFromFile = () => {};
}
