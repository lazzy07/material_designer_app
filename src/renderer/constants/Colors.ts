export let defaultColors = {
  id: "0",
  fileName: "Default Theme",
  DEFAULT_BACKGROUND_COLOR: "#293538",
  IMPORTANT_BACKGROUND_COLOR: "#20292b",
  FONT_COLOR: "#b3b6b6",
  IMPORTANT_FONT_COLOR: "#cfd5d6",
  DISABLED_FONT_COLOR: "#5a6f72",
  ERROR_COLOR: "#e8232d",
  PRIMARY_COLOR: "#009688",
  HOVER_COLOR: "#5a6f72",
  BORDER_COLOR: "#364346",

  nodeId: "0",
  nodeFIleName: "Default Theme",
  GENERATOR_COLOR: "#e91e63",
  GENERATOR_GRAYSCALE: "#8bc34a",
  PROCESS_COLOR: "#ff5722",
  PROCESS_GRAYSCALE: "#00bcd4",
  OUTPUT_COLOR: "#673ab7",
  OUTPUT_GRAYSCALE: "#f44336",
  GRAPH_EDITOR_BACKGRUND_COLOR: "#2d3a3d",
  GRAPH_EDITOR_GRID_COLOR: "#364346",
  NODE_HEADER_FONT_COLOR: "#ffffff",
  NODE_BODY_BACKGROUND_COLOR: "#20292b",
  NODE_BODY_FONT_COLOR: "#b3b6b6",
  GRAYSCALE_CONNETION_COLOR: "#b3b6b6",
  COLOR_CONNECTION_COLOR: "#ffa500",

  NUMBER_CONECTION_COLOR: "#8bc34a",
  NUMBER2_CONNECTION_COLOR: "#e91e63",
  COLORVEC_CONNECTION_COLOR: "#ff5722",
  COLORVEC3_CONNECTION_COLOR: "#00bcd4",
  LUT_CONNECTION_COLOR: "#673ab7",
  LUT3_CONNECTION_COLOR: "#ffa500",
  BOOLEAN_CONNECTION_COLOR: "#b3b6b6",
};

export class ThemeManager {
  static initTheme = () => {
    let theme = localStorage.getItem("theme");

    if (theme) {
      let themeJson = JSON.parse(theme);
      ThemeManager.loadTheme(themeJson);
    }
  };

  static setColor = (key: string, val: string) => {
    defaultColors[key] = val;
    const r = document.querySelector(":root");

    if (r) {
      (r as any).style.setProperty("--" + key, val);
    }
  };

  static loadTheme = (themeData: any) => {
    for (let [key, value] of Object.entries(themeData)) {
      ThemeManager.setColor(key, value as string);
    }
  };

  static saveTheme = () => {
    localStorage.setItem("theme", JSON.stringify(defaultColors));
  };
}
