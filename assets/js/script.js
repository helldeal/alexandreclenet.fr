import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";
//import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";
//import { Reflector } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/objects/Reflector";
import { FontLoader } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/FontLoader.js";

import Stats from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/libs/stats.module.js";
//import { FirstPersonControls } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/FirstPersonControls.js';
import { FlyControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/FlyControls.js";
import {
  Lensflare,
  LensflareElement,
} from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/objects/Lensflare.js";

let container, stats;

let camera, scene, renderer;
let controls;

var lightArray =[]
var meteorArray =[]
var lightindex2=6
var flareintensity=0

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


  // scene

  scene = new THREE.Scene();
  scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
  scene.fog = new THREE.Fog(scene.background, 5000, 15000);

  // world


  const geometry = new THREE.DodecahedronGeometry(50, 0);
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

    scene.add(mesh);
    meteorArray.push(mesh)
  }

   //LOADER 

  const loader = new FontLoader();
  loader.load(
    "assets/js/font.json",
    function (font) {
      const matLite = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });

      const message = "  WORK IN\nPROGRESS";

      const shapes = font.generateShapes(message, 50);

      const geometry = new THREE.ShapeGeometry(shapes);
      geometry.computeBoundingBox();

      const xMid =
        -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);

      const text = new THREE.Mesh(geometry, matLite);
      text.position.z = -150;
      scene.add(text);

      camera.lookAt(new THREE.Vector3(text.position.x, 0, text.position.z));
    }
  ); //end load function

  // lights

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.05);
  dirLight.position.set(0, 1, 0).normalize();
  dirLight.color.setHSL(0.1, 0.7, 0.5);
  scene.add(dirLight);

  const textureLoader = new THREE.TextureLoader();

  const textureFlare0 = textureLoader.load( 'assets/js/lensflare0.png' );
  const textureFlare3 = textureLoader.load( 'assets/js/lensflare3.png' );

  addLight(0.55, 1, 0, -800, -60, -6000);
  addLight(0.08, 1, 0, 0, -500, -1000);
  addLight(0.5, 1, 0, 3000, 0, -1000);
  addLight(0.1, 1, 0, -4000, 100, -6000);
  addLight(0.3, 1, 0, -3000, 30, -1000);
  addLight(0.995, 1, 0, 400, 300, -4000);
  addLight(0.3, 1, 0, 4000, 20, -6000);
    
  function addLight(h, s, l, x, y, z) {
    const light = new THREE.PointLight(0xffffff, 2, 8000);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    scene.add(light);
    lightArray.push({light:light,h:h});

    const lensflare = new Lensflare();
    lensflare.addElement( new LensflareElement( textureFlare0, 700, 0, light.color ) );
    lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6, light.color ) );
    lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7, light.color ) );
    lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9 , light.color) );
    lensflare.addElement( new LensflareElement( textureFlare3, 70, 1 , light.color) );
    light.add( lensflare );
  }

  // renderer

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  //FLY

  controls = new FlyControls(camera, renderer.domElement);

  controls.movementSpeed =0;
  controls.domElement = container;
  controls.rollSpeed = Math.PI / 50;
  controls.autoForward = false
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
  
  for(let i = 0; i < 5000; i++){
    meteorArray[i].rotateZ(0.001*Math.random())
  }

  if(camera.position.z<6000)camera.translateZ(0.2)
  //lightArray[lightindex2].light.intensity-=lightArray[lightindex2].light.intensity/100+0.0001
  flareintensity-=flareintensity/100+0.0001
  lightArray[lightindex2].light.color.setHSL(lightArray[lightindex2].h, 0.5,flareintensity);
  if(flareintensity<0){
    //console.log(lightArray[lightindex2].light)
    lightindex2++
    if (lightindex2>6)lightindex2=0
    //lightArray[lightindex2].light.intensity=2
    flareintensity=0.8
  }

  controls.update(delta);
  renderer.render(scene, camera);
}
