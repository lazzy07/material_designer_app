//This is the interface of projct package element
export interface PackageElement {
  id: string;
  name: string;
  contentType: "package" | "graph";
  children: PackageElement[];
}
