import SlideComponent from '../Slide.component';

import * as slide4 from './slide4.pug';
import * as slide4Style from './slide4.scss';

// service
import * as THREE from 'three';

export default class Slide4Component extends SlideComponent {
  constructor({
                context,
                slideIndex,
              }) {
    super({
      context,
      slideIndex,
    });
  };

  load() {
    return this.init({
      pugTemplate: slide4,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
    })
      .then(() => {
        this.webGlDemoShow();
      });
  };

  paramInit(){
    this.container = this.context.querySelector('.' + _style.container);
  };

  webGlDemoShow() {
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

      cube.rotation.x += 0.05;
      cube.rotation.y += 0.05;
      renderer.render(scene, camera);
    };

    render();
  };
};

// private
let
  _style = slide4Style
;
