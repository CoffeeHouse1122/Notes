import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "dat.gui";

/**
 * Debug
 */
const gui = new dat.GUI({
  closed: true,
});

/**
 * Canvas
 */
const canvas = document.querySelector("canvas.webgl");

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const examplesTexture = textureLoader.load("/textures/KV2-EN.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps3.png");
console.log('matcapTexture: ', matcapTexture);
// examplesTexture.minFilter = THREE.NearestFilter;
// examplesTexture.magFilter = THREE.NearestFilter;
// examplesTexture.generateMipmaps = false;

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 3);
scene.add(camera);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial({
//   color: 'red',
// });
// material.map = examplesTexture;
// material.color.set(0xffffff);
// material.transparent = true;
// material.opacity = 0.5;
// material.wireframe = true;
// material.alphaMap = examplesTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = examplesTexture;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = examplesTexture;

// const material = new THREE.MeshStandardMaterial();
// material.side = THREE.DoubleSide;
// material.metalness = 0.45;
// material.roughness = 0.65;
// material.map = examplesTexture;
// gui.add(material, 'metalness').min(0).max(1).step(0.01);
// gui.add(material, 'roughness').min(0).max(1).step(0.01);

// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 16, 16),
//   material
// );
// sphere.position.x = -1.5;

// const plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(1, 1),
//   material
// );

// const torus = new THREE.Mesh(
//   new THREE.TorusGeometry(0.3, 0.2, 16, 32),
//   material
// )
// torus.position.x = 1.5;

// scene.add(sphere, plane, torus);

/**
 * Fonts
 */
const loader = new FontLoader();
const font = loader.load(
  // 资源URL
  "fonts/helvetiker_regular.typeface.json",

  // onLoad回调
  function (font) {
    // do something with the font
    const textGeometry = new TextGeometry("Hello three.js!", {
      font: font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    });

    // textGeometry.computeBoundingBox();
    // textGeometry.translate(
    //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
    //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
    //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5
    // );

    textGeometry.center()

    const material = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    // textMaterial.wireframe = true;
    const text = new THREE.Mesh(textGeometry, material);
    scene.add(text);

    console.time("donuts");
    const donutGemotry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

    for(let i = 0; i < 1000; i++) {  
    
      const donut = new THREE.Mesh(donutGemotry, material);

      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scale = Math.random();
      donut.scale.set(scale, scale, scale) 

      scene.add(donut);
    }
    console.timeEnd("donuts")

  },

  // onProgress回调
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },

  // onError回调
  function (err) {
    console.log("An error happened");
  }
);

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);

/**
 * Clock
 */
const clock = new THREE.Clock();

/**
 * Animate
 */
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // sphere.rotation.y = elapsedTime * 0.1;
  // plane.rotation.y = elapsedTime * 0.1;
  // torus.rotation.y = elapsedTime * 0.1;

  // sphere.rotation.x = elapsedTime * 0.15;
  // plane.rotation.x = elapsedTime * 0.15;
  // torus.rotation.x = elapsedTime * 0.15;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

/**
 * Resize
 */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * axes helper
 */
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
