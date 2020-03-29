export interface ImportAssetFile {
  id: string;
  filePath: string;
  fileName: string;
  selected: boolean;
  isWeb: boolean;
  isLocal: boolean;
  activeType: "inactive" | "saving" | "error" | "done";
}
