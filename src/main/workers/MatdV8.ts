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

  static parseJSONToNodeGraph(nodeGraph: string) {
    this.getLib().parseJSONToNodeProject(nodeGraph);
  }
}
