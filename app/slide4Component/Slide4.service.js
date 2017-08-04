import * as slide4Style from './slide4.scss';

export default class Slide4Service {
  constructor(context) {
    this.context = context;
    this.container = this.context.querySelector('.' + _style.container);
    this.slideIndex = 4;
  };

  load(mainSwiper) {
    let
      containerClientRect = this.container.getBoundingClientRect()
      , containerW = containerClientRect.width
      , containerH = containerClientRect.height
    ;

    let
      scene = new THREE.Scene()
      , camera = new THREE.PerspectiveCamera(75, containerW / containerH, 0.1, 1000)
      , renderer = new THREE.WebGLRenderer()
    ;

    renderer.setSize(containerW, containerH);
    this.container.appendChild(renderer.domElement);

    let
      geometry = new THREE.BoxGeometry(1, 1, 1)
      , material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      })
      , cube = new THREE.Mesh(geometry, material)
    ;
    scene.add(cube);
    camera.position.z = 5;

    let render = () => {
      requestAnimationFrame(render);

      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      renderer.render(scene, camera);
    };

    render();
  };
};

// private
let
  _style = slide4Style
;
