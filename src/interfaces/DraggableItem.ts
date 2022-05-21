export type DRAGGABLE_ITEM_TYPE =
  | "texture"
  | "hdri"
  | "shaderNode"
  | "dataNode"
  | "shaderGraph"
  | "dataGraph";

export interface DraggableItem<T> {
  itemType: DRAGGABLE_ITEM_TYPE;
  item: T;
}
