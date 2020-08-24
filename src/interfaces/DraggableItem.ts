export type DRAGGABLE_ITEM_TYPE = "texture" | "hdri" | "node";

export interface DraggableItem<T> {
  itemType: DRAGGABLE_ITEM_TYPE;
  item: T;
}
