import { ItemConfigType, Config } from "golden-layout";

const getActiveItemsHelper = (
  content: ItemConfigType[],
  activeItems: string[]
) => {
  for (let i of content) {
    if (i.type === "react-component") {
      activeItems.push(i.title!);
    } else {
      if (i.content) {
        getActiveItemsHelper(i.content, activeItems);
      } else {
        return;
      }
    }
  }
};

export const getActiveItems = (config: Config) => {
  let activeItems: string[] = [];
  if (config.content) getActiveItemsHelper(config.content, activeItems);

  return activeItems;
};
