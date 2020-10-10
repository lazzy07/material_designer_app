import { NodeData } from "../../interfaces/NodeData";
import { getAllFiles, readJsonFile } from "../../renderer/services/FileServices";
import Path from 'path';
import { ipcMain, ipcRenderer } from "electron";
import { IpcMessages } from "../../IpcMessages";
import { screens } from "../main";

export default class NodeLibrary{
  private static libraryNodes: NodeData[] = [];
  private static projectNodes: NodeData[] = [];

  getLibraryNodes(){
    return NodeLibrary.libraryNodes
  }

  addLibraryNode(node: NodeData){
    NodeLibrary.libraryNodes.push(node);
  }

  removeLibraryNode(nodeId: string){
    let libNodes: NodeData[] = []
    for(const i of NodeLibrary.libraryNodes){
      if(i.id !== nodeId){
        libNodes.push(i);
      }
    }

    NodeLibrary.libraryNodes = [...libNodes];
  }

  getProjectNodes(){
    return NodeLibrary.projectNodes
  }

  addProjectNode(node: NodeData){
    NodeLibrary.projectNodes.push(node);
  }

  removeProjectNode(nodeId: string){
    let libNodes: NodeData[] = []
    for(const i of NodeLibrary.libraryNodes){
      if(i.id !== nodeId){
        libNodes.push(i);
      }
    }

    NodeLibrary.projectNodes = [...libNodes];
  }

  private getLibraryData = async (path: string) => {
    let libData: NodeData[] = []
    
    try{
      const files = await getAllFiles(path);
      for(const file of files){
        const filePath = Path.join(path, file);
        const nodeData = await readJsonFile<NodeData>(filePath);

        libData.push(nodeData);
      }

      return libData;
    }catch(err){
      //TODO:: Handle error
      console.log(err);
      return [];
    }
  }

  emitDataToRenderer = (message: string,nodeData: NodeData[]) => {
    screens.editorScreen.window?.webContents.send(message, nodeData);
    for(const screen of screens.subEditorScreens){
      screen.window?.webContents.send(message, nodeData);
    }
  }

  loadLocalNodeLibrary = async (path: string) => {
    NodeLibrary.libraryNodes = [];
    NodeLibrary.libraryNodes = await this.getLibraryData(path);
    
    this.emitDataToRenderer(IpcMessages.REFRESH_LOCAL_LIBRARY_NODES, NodeLibrary.libraryNodes)
  }

  loadProjectNodeLibrary = async (path: string) => {
    NodeLibrary.projectNodes = [];
    NodeLibrary.projectNodes = await this.getLibraryData(path);
    
    this.emitDataToRenderer(IpcMessages.REFRESH_LOCAL_PROJECT_NODES, NodeLibrary.projectNodes);
  }
}