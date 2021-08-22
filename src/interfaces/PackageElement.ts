//This is the interface of projct package element
export interface PackageElement {
  id: string;
  name: string;
  contentType: PACKAGE_CONTENT_TYPE;
  children: PackageElement[];
}

export type PACKAGE_CONTENT_TYPE = "package" | "graph";
