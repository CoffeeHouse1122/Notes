import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
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
camera.position.set(2, 2, 2);
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
 * Lights
 */
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// ambientLight.color = new THREE.Color(0xffffff);
scene.add(ambientLight);

gui.add(ambientLight, "intensity").min(0).max(1).step(0.001).name("ambientLightIntensity");

// 平行光
const directionalLight = new THREE.DirectionalLight(0x00fffc, 1);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

// 半球光
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1);
scene.add(hemisphereLight);

// 点光源
const pointLight = new THREE.PointLight(0xff9900, 1, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

// 矩形区域光
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

// 聚光灯
const spotLight = new THREE.SpotLight(0x78ff00, 2, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);
spotLight.target.position.x = -0.75;
scene.add(spotLight.target);


/**
 * Objects
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material
);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.75, 0.75),
  material
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
)
torus.position.x = 1.5;

// plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  material
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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
  sphere.rotation.y = elapsedTime * 0.1;
  cube.rotation.y = elapsedTime * 0.1;
  torus.rotation.y = elapsedTime * 0.1;

  sphere.rotation.x = elapsedTime * 0.15;
  cube.rotation.x = elapsedTime * 0.15;
  torus.rotation.x = elapsedTime * 0.15;

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
 *  Helper
 */
// axesHelper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// hemisphereLightHelper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
scene.add(hemisphereLightHelper); 

// directionalLightHelper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
scene.add(directionalLightHelper);

// pointLightHelper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

// spotLightHelper
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// rectAreaLightHelper
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);