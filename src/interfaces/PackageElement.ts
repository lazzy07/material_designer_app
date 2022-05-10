//This is the interface of projct package element
export interface PackageElement {
  id: string;
  name: string;
  contentType: PACKAGE_CONTENT_TYPE;
  //Remove
  children: string[];
}

export interface PackageTreeElement {
  id: string;
  children: PackageTreeElement[];
}

export type PACKAGE_CONTENT_TYPE = "package" | "graph";
