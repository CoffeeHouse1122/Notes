import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Debug 
 */
const gui = new dat.GUI({
  // closed: true,
});

/**
 * Canvas
 */
const canvas = document.querySelector("canvas.webgl");

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
camera.position.set(0, 0, 4);
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
 * Mouse
 */
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("click", () => {
  if (currentIntersect) {
    switch (currentIntersect.object) {
      case object1:
        console.log("click on object 1");
        break;
      case object2:
        console.log("click on object 2");
        break;
      case object3:
        console.log("click on object 3");
        break;
    }
  }
});

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  })
);

object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  })
);

object3.position.x = 2;

scene.add(object1, object2, object3);

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();

// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayDirction = new THREE.Vector3(10, 0, 0);
// rayDirction.normalize();

// raycaster.set(rayOrigin, rayDirction);

// const intersect = raycaster.intersectObject(object2);

// const intersects = raycaster.intersectObjects([object1, object2, object3]);

/**
 * Clock
 */
const clock = new THREE.Clock();

let currentIntersect = null;

/**
 * Animate
 */
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Animate objects
  object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

  // cast a ray
  raycaster.setFromCamera(mouse, camera);

  // const rayOrigin = new THREE.Vector3(-3, 0, 0);
  // const rayDirction = new THREE.Vector3(1, 0, 0);
  // rayDirction.normalize();

  // raycaster.set(rayOrigin, rayDirction);

  const objectsToTest = [object1, object2, object3];
  const intersects = raycaster.intersectObjects(objectsToTest);

  for (const object of objectsToTest) {
    object.material.color.set(0xff0000);
  }

  for (const intersect of intersects) {
    intersect.object.material.color.set(0x0000ff);
  }

  if (intersects.length) {
    if (currentIntersect === null) {
      // console.log("mouse enter");
    }
    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      // console.log("mouse leave");
    }
    currentIntersect = null;
  }

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
