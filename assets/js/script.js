import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";
import { Reflector } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/objects/Reflector";
import { FontLoader } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/FontLoader.js";

import Stats from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/libs/stats.module.js";

import { FlyControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/FlyControls.js";
import {
  Lensflare,
  LensflareElement,
} from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/objects/Lensflare.js";

let container, stats;

let camera, scene, renderer;
let controls;

const clock = new THREE.Clock();

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  // camera

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    15000
  );
  camera.position.z = 250;
  camera.ss;

  // scene

  scene = new THREE.Scene();
  scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
  scene.fog = new THREE.Fog(scene.background, 3500, 15000);

  // world

  const s = 250;

  const geometry = new THREE.BoxGeometry(s, s, s);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 50,
  });

  for (let i = 0; i < 5000; i++) {
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = 12000 * (2.0 * Math.random() - 1.0);
    mesh.position.y = 12000 * (2.0 * Math.random() - 1.0);
    mesh.position.z = 12000 * (2.0 * Math.random() - 1.0);

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    scene.add(mesh);
  }

   //LOADER 

  const loader = new FontLoader();
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
    function (font) {
      const matLite = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });

      const message = " WORK IN\nPROGRESS";

      const shapes = font.generateShapes(message, 50);

      const geometry = new THREE.ShapeGeometry(shapes);
      geometry.computeBoundingBox();

      const xMid =
        -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);

      const text = new THREE.Mesh(geometry, matLite);
      text.position.z = -150;
      scene.add(text);

      camera.ss(new THREE.Vector3(text.position.x, 0, text.position.z));
    }
  ); //end load function

  // lights

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.05);
  dirLight.position.set(0, -1, 0).normalize();
  dirLight.color.setHSL(0.1, 0.7, 0.5);
  scene.add(dirLight);

  addLight(0.55, 0.9, 0.5, 0, 0, -6000);
  addLight(0.08, 0.8, 0.5, 0, 0, -1000);
  addLight(0.995, 0.5, 0.5, 0, 300, -4000);

  function addLight(h, s, l, x, y, z) {
    const light = new THREE.PointLight(0xffffff, 1.5, 2000);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    scene.add(light);
    s;
  }

  // renderer

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  //FLY

  controls = new FlyControls(camera, renderer.domElement);

  controls.movementSpeed = 0;
  controls.domElement = container;
  controls.rollSpeed = Math.PI / 10;
  controls.autoForward = false;
  controls.dragToLook = false;

  // stats

  stats = new Stats();
  container.appendChild(stats.dom);

  // events

  window.addEventListener("resize", onWindowResize);
}

//RESIZE

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

//LOOP

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  const delta = clock.getDelta();

  controls.update(delta);
  renderer.render(scene, camera);
}
