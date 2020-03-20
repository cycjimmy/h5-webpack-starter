import {Page, singleton} from '@cycjimmy/h5-pages';

import template from './webglDemo.pug';
import _style from './webglDemo.scss';

export default singleton(class extends Page {
  constructor() {
    super({
      name: 'webglDemo',
      renderHtml: template({_style}),
    });
  };

  paramInit() {
    super.paramInit();
    this.container = this.page.querySelector('.' + _style.container);
  };

  extraRender() {
    this._webGlDemoShow();
  };

  _webGlDemoShow() {
    const
      containerClientRect = this.container.getBoundingClientRect()
      , containerW = containerClientRect.width
      , containerH = containerClientRect.height
    ;

    const
      scene = new THREE.Scene()
      , camera = new THREE.PerspectiveCamera(75, containerW / containerH, 0.1, 1000)
      , renderer = new THREE.WebGLRenderer()
    ;

    renderer.setSize(containerW, containerH);
    this.container.appendChild(renderer.domElement);

    const
      geometry = new THREE.BoxGeometry(1, 1, 1)
      , material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      })
      , cube = new THREE.Mesh(geometry, material)
    ;
    scene.add(cube);
    camera.position.z = 5;

    const render = () => {
      requestAnimationFrame(render);

      cube.rotation.x += 0.05;
      cube.rotation.y += 0.05;
      renderer.render(scene, camera);
    };

    render();
  };
});

