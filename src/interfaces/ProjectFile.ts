//This is to show detailed info about project file (When opening the file / Recently opened files)
export interface ProjectFile {
  filePath: string;
  lastModified: number;
  description: string;
  type: "local" | "cloud";
}
