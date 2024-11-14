import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Canvas
 */
const canvas = document.querySelector("canvas.webgl");

/**
 * Debug
 */
const gui = new dat.GUI({
  closed: true,
});

// gui.hide();

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 });
  },
};

gui.addColor(parameters, "color").onChange(() => {
  cube.material.color.set(parameters.color);
});

gui.add(parameters, "spin");

/**
 * Textures
 * */
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//   texture.needsUpdate = true;
// }
// image.src = '/textures/KV-TC-m.jpg';
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("onStart");
};
loadingManager.onLoad = () => {
  console.log("onLoad");
};
loadingManager.onProgress = () => {
  console.log("onProgress");
};
loadingManager.onError = () => {
  console.log("onError");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load(
  "/textures/KV2-EN.jpg",
  () => {
    console.log("load");
  },
  // 目前暂不支持onProgress的回调
  undefined,
  () => {
    console.log("error");
  }
);
// texture.repeat.x = 3;
// texture.repeat.y = 2;
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

// texture.offset.x = 0.5;
// texture.offset.y = 0.5;

// texture.rotation = Math.PI / 4;
// texture.center.x = 0.5;
// texture.center.y = 0.5;

// texture.generateMipmaps = false;
texture.minFilter = THREE.NearestFilter;
// texture.magFilter = THREE.NearestFilter;

/**
 * Cursor
 *  */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  cursor.x = clientX / window.innerWidth - 0.5;
  cursor.y = -(clientY / window.innerHeight - 0.5);
  // console.log('cursor.y: ', cursor.y);
});

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Camera
 * */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 1000)

camera.position.set(2, 2, 2);
// console.log('camera: ', camera.position.length());

scene.add(camera);

/*
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();
// controls.enableZoom = false;
// controls.enablePan = true;
// controls.keys = {
// 	LEFT: 'ArrowLeft', //left arrow
// 	UP: 'ArrowUp', // up arrow
// 	RIGHT: 'ArrowRight', // right arrow
// 	BOTTOM: 'ArrowDown' // down arrow
// }

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/*
 * Objects
 */
const group = new THREE.Group();
scene.add(group);

/**
 * Cube
 */
const geometry = new THREE.BoxGeometry(2, 2, 2);
console.log(geometry.attributes.uv);
// const geometry = new THREE.BufferGeometry();

// const vertices = new Float32Array([
//   0, 0, 0,
//   0, 0, 1,
//   0, 1, 0
// ]);
// geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

// const count = 50;
// const positionsArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5) * 4;
// }

// geometry.setAttribute("position", new THREE.BufferAttribute(positionsArray, 3));

const material = new THREE.MeshBasicMaterial({
  // color: 0xff0000,
  // wireframe: true,
  map: texture,
});
const cube = new THREE.Mesh(geometry, material);
// cube.position.set( 0.7, -0.6, 1 );
// cube.scale.set( 2, 0.5, 0.5 );
// cube.rotation.reorder( 'YXZ' );
// cube.rotation.set( Math.PI * 0.25, Math.PI * 0.25, 0 );
scene.add(cube);

// DeBug
gui.add(cube.position, "y").min(-3).max(3).step(0.01).name("elevation");
gui.add(cube.position, "x").min(-3).max(3).step(0.01).name("azimuth");
gui.add(cube.position, "z").min(-3).max(3).step(0.01).name("distance");
gui.add(cube, "visible").name("cube visible");
gui.add(cube.material, "wireframe").name("cube wireframe");

// camera.lookAt( cube.position );

// group.add( cube );

// const cube2 = new THREE.Mesh(geometry, material)
// cube2.position.x = 2
// group.add( cube2 );

// const cube3 = new THREE.Mesh(geometry, material)
// cube3.position.x = -2
// group.add( cube3 );

// group.position.y = 1;

/**
 * Blue Line
 */
const lineMaterial = new THREE.LineBasicMaterial({ color: "#0000ff" });
const points = [];
points.push(new THREE.Vector3(-1, 0, 0));
points.push(new THREE.Vector3(0, 1, 0));
points.push(new THREE.Vector3(1, 0, 0));
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
line.position.set(1, 0, 0);
// scene.add( line );

/**
 * axes helper
 */
const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

// Animations
// function animate() {
// 	requestAnimationFrame( animate );
//   line.rotation.y += 0.01;
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
// 	renderer.render( scene, camera );
// }
// animate();

/**
 * Clock
 */
const clock = new THREE.Clock();

/**
 * Time
 */
// let time = Date.now();

// gsap.to(cube.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(cube.position, { duration: 1, delay: 2, x: 0 })

const tick = () => {
  // Time
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // Clock
  const elapsedTime = clock.getElapsedTime();
  // console.log('elapsedTime: ', elapsedTime);

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;

  // Update controls
  controls.update();

  // Update objects
  // cube.rotation.y = elapsedTime;
  // cube.rotation.x += 0.01
  // cube.rotation.z += 0.01

  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  camera.lookAt(cube.position);

  // Render
  renderer.render(scene, camera);
  // console.log('tick')
  // Call tick again on the next frame
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
 * Fullscreen
 */
// window.addEventListener("dblclick", () => {
//   // 兼容safari
//   const fullscreenElement =
//     document.fullscreenElement || document.webkitFullscreenElement;

//   if (fullscreenElement) {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//     }
//   } else {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen();
//     } else if (canvas.webkitRequestFullscreen) {
//       canvas.webkitRequestFullscreen();
//     }
//   }
// });
