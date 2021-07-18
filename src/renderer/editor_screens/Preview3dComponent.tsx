import React, { Component } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  Material,
  MeshBasicMaterial,
  PMREMGenerator,
  Texture,
  DataTextureLoader,
  TextureLoader,
} from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Path from "path";

import DropFileComponent from "../components/library_components/DropFileComponent";
import {
  DRAGGABLE_ITEM_TYPE,
  DraggableItem,
} from "../../interfaces/DraggableItem";
import { AssetPreviewFile } from "../../interfaces/AssetPreviewFile";
import { defaultColors } from "../constants/Colors";
import { getLocalAssetPath } from "../services/GetAsset";

interface Props {
  dimensions: { width: number; height: number };
}

interface State {
  envMapPath: string;
}

const accceptedDropFileTypes: DRAGGABLE_ITEM_TYPE[] = ["hdri"];
const menuHeight = 32;
export default class Preview3dComponent extends Component<Props, State> {
  rendererDom: HTMLDivElement | null = null;
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  mesh: Mesh;
  material: Material;
  controller: OrbitControls | null = null;
  envMap: Texture | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      envMapPath: "",
    };

    const { width, height } = this.props.dimensions;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      width / (height - menuHeight),
      0.1,
      1000
    );
    this.renderer = new WebGLRenderer({ antialias: true, precision: "highp" });
    const geometry = new BoxGeometry(1, 1, 1);
    this.material = new MeshBasicMaterial({ color: "#e8232d" });
    this.mesh = new Mesh(geometry, this.material);
  }

  handleDrop = (data: DraggableItem<AssetPreviewFile>) => {
    if (data.item.isLocal) {
      getLocalAssetPath(data.item.id, data.item.filePath!)
        .then((val) => {
          this.setState({
            envMapPath: val,
          });
        })
        .catch((err) => {
          //TODO:: Handle Error
          console.log(err);
        });
    }
  };

  /** Renderer Functionality */
  initRenderer = () => {
    const { width, height } = this.props.dimensions;
    this.renderer.setSize(width, height - menuHeight);
    this.renderer.setClearColor(defaultColors.DEFAULT_BACKGROUND_COLOR);
    this.rendererDom?.appendChild(this.renderer.domElement);
    this.scene.add(this.mesh);
    this.controller = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.z = 5;
    this.controller.update();
    this.animate();
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controller!.update();
    this.renderer.render(this.scene, this.camera);
  };

  changeCameraAspect = () => {
    this.camera.aspect =
      this.props.dimensions.width / (this.props.dimensions.height - menuHeight);
    this.camera.updateProjectionMatrix();
  };

  updateRenderer = (oldDimensions: { width: number; height: number }) => {
    if (
      JSON.stringify(this.props.dimensions) !== JSON.stringify(oldDimensions)
    ) {
      const { width, height } = this.props.dimensions;
      this.renderer.setSize(width, height - menuHeight);
      this.changeCameraAspect();
    }
  };

  loadTextureToScene = (
    loader: DataTextureLoader | TextureLoader,
    pathData: Path.ParsedPath
  ) => {
    loader.setPath(pathData.dir);
    try {
      loader.load(Path.join("/", pathData.base), (data) => {
        this.envMap = new PMREMGenerator(this.renderer).fromEquirectangular(
          data
        ).texture;
        this.scene.environment = this.envMap;
        this.scene.background = this.envMap;
        localStorage.setItem("envMap", this.state.envMapPath);
      });
    } catch (err) {
      //TODO:: Error handling
      console.log(err);
    }
  };

  loadEnvironmentFile = (oldEnvMapPath: string) => {
    if (this.state.envMapPath !== oldEnvMapPath) {
      const pathData = Path.parse(this.state.envMapPath);
      const ext = pathData.ext;
      if (ext === ".hdr") {
        const loader = new RGBELoader();
        this.loadTextureToScene(loader, pathData);
      } else if (ext === ".exr") {
        const loader = new EXRLoader();
        this.loadTextureToScene(loader, pathData);
      } else if (ext === ".png" || ext === ".jpeg" || ext === ".jpg") {
        const loader = new TextureLoader();
        this.loadTextureToScene(loader, pathData);
      }
    }
  };

  loadLastLoadedHdri = () => {
    const envMapPath = localStorage.getItem("envMap");
    if (envMapPath) {
      this.setState({ envMapPath });
    }
  };

  /** Renderer functionality end */
  componentDidMount = () => {
    this.initRenderer();
    this.loadLastLoadedHdri();
  };

  componentDidUpdate = (oldProps: Props, oldState: State) => {
    this.updateRenderer(oldProps.dimensions);

    this.loadEnvironmentFile(oldState.envMapPath);
  };

  render() {
    return (
      <DropFileComponent
        onDropComplete={this.handleDrop}
        dropType={accceptedDropFileTypes}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <div ref={(ref) => (this.rendererDom = ref)}></div>
        </div>
      </DropFileComponent>
    );
  }
}
