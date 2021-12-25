export default class MatdV8 {
  private libPath: string;
  private static matdV8: MatdV8;
  private matdLib: any;

  private constructor(libPath: string) {
    this.libPath = libPath;
    const { MatdV8 } = eval("require")(this.libPath);
    this.matdLib = new MatdV8();
  }

  static init(libPath: string) {
    MatdV8.matdV8 = new MatdV8(libPath);
  }

  static getLib() {
    return MatdV8.matdV8.matdLib;
  }

  static setComputationDevice(platformID: number, deviceID: number) {
    this.getLib().setComputationDevice(platformID, deviceID);
  }

  static getAvailableEngines(): {
    platformID: number;
    deviceID: number;
    platformName: string;
    deviceName: string;
  }[] {
    return this.getLib().getAvailableEngines();
  }

  static openNodeProject(nodeProject: string) {
    this.getLib().openNodeProject(nodeProject);
  }

  static updateNodeProject(nodeProject: string) {
    this.getLib().updateNodeProject(nodeProject);
  }

  static updateNodeGraph(graph: string) {
    this.getLib().updateNodeGraph(graph);
  }

  static selectCurrentNodeGraph(graph: string) {
    this.getLib().selectCurrentNodeGraph(graph);
  }
}
