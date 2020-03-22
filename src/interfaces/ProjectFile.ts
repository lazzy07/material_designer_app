export interface ProjectFile {
  filePath: string;
  lastModified: number;
  description: string;
  type: "local" | "cloud";
}
