import NodeEditor from "../common/NodeEditor";
import DataNodeEngine from "./DataNodeEngine";

export default class DataNodeEditor extends NodeEditor{
  constructor(domElement: HTMLDivElement){
    super(domElement, new DataNodeEngine());
  }
}