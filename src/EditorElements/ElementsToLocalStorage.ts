import { Config } from "golden-layout";
export class ElementsToLocalStorage {
  static data: { id: string; config: Config }[];

  static initData = () => {
    const strdata = localStorage.getItem("screenData");
    if (strdata) {
      ElementsToLocalStorage.data = JSON.parse(strdata);
    }
  };

  static addData = (id: string, config: Config) => {
    ElementsToLocalStorage.initData();
    ElementsToLocalStorage.data.push({ id, config });
  };

  static updateData = (id: string, config: Config) => {
    ElementsToLocalStorage.initData();
    const data = [...ElementsToLocalStorage.data];

    for (let i of data) {
      if (i.id === id) {
        i.config = config;
      }
    }

    ElementsToLocalStorage.data = data;
  };

  static removeData = (id: string) => {
    ElementsToLocalStorage.initData();
    const data = [...ElementsToLocalStorage.data];

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data.splice(i, 1);
      }
    }

    ElementsToLocalStorage.data = data;
  };
}
