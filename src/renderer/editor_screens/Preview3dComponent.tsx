import React, { Component } from 'react'
import DropFileComponent from '../components/library_components/DropFileComponent'
import { DRAGGABLE_ITEM_TYPE, DraggableItem } from '../../interfaces/DraggableItem'
import { AssetPreviewFile } from '../../interfaces/AssetPreviewFile'
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, Material, MeshBasicMaterial } from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { defaultColors } from '../constants/Colors'

interface Props {
  dimensions: { width: number, height: number }
}

const accceptedDropFileTypes: DRAGGABLE_ITEM_TYPE[] = ["hdri"]
const menuHeight = 32;
export default class Preview3dComponent extends Component<Props> {
  rendererDom: HTMLDivElement | null = null;
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  mesh: Mesh;
  material: Material;
  controller: OrbitControls | null = null;

  constructor(props: Props) {
    super(props)
    const { width, height } = this.props.dimensions;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, width / (height - menuHeight), 0.1, 1000);
    this.renderer = new WebGLRenderer({ antialias: true, precision: "highp" });
    const geometry = new BoxGeometry(1, 1, 1);
    this.material = new MeshBasicMaterial({ color: "#e8232d" });
    this.mesh = new Mesh(geometry, this.material);
  };

  handleDrop = (data: DraggableItem<AssetPreviewFile>) => {
    console.log(data);
  }

  /** Renderer Functionality */
  initRenderer = () => {
    const { width, height } = this.props.dimensions;
    this.renderer.setSize(width, height - menuHeight);
    this.renderer.setClearColor(defaultColors.DEFAULT_BACKGROUND_COLOR)
    this.rendererDom?.appendChild(this.renderer.domElement);
    this.scene.add(this.mesh);
    this.controller = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.z = 5;
    this.controller.update();
    this.animate()
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controller!.update();
    this.renderer.render(this.scene, this.camera);
  }

  changeCameraAspect = () => {
    this.camera.aspect = this.props.dimensions.width / (this.props.dimensions.height - menuHeight);
    this.camera.updateProjectionMatrix()
  }

  updateRenderer = (oldDimensions: { width: number, height: number }) => {
    if (JSON.stringify(this.props.dimensions) !== JSON.stringify(oldDimensions)) {
      const { width, height } = this.props.dimensions;
      this.renderer.setSize(width, height - menuHeight);
      this.changeCameraAspect();
    }
  }

  /** Renderer functionality end */
  componentDidMount = () => {
    this.initRenderer();
  };

  componentDidUpdate = (oldProps: Props) => {
    this.updateRenderer(oldProps.dimensions);
  }


  render() {
    return (
      <DropFileComponent onDropComplete={this.handleDrop} dropType={accceptedDropFileTypes}>
        <div style={{ height: "100%", width: "100%" }}>
          <div ref={ref => this.rendererDom = ref}></div>
        </div>
      </DropFileComponent>
    )
  }
}
