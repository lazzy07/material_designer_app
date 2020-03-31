import { ImportTypes } from "../renderer/services/ImportImageData";

export type FileDataType = "base64" | "path";
export type PreviewType = "image" | "icon";

export interface AssetFile {
  id: string;
  fileName: string;
  type: ImportTypes;
  data: string;
  dataType: FileDataType;
  preview: string;
  previewType: PreviewType;
}
