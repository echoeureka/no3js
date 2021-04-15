import * as THREE from "../lib/three.module.js";
// import "../lib/Stats.js";
// import "../lib/dat.gui.js";

console.log(`Using Three.js Version ${THREE.REVISION}`);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// const axes = new THREE.AxesHelper(20);
// scene.add(axes);

const planeGeometry = new THREE.PlaneGeometry(60, 20);
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });

const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
// const boxMaterial = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });

const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
// const sphereMaterial = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });

/**
 * 更改材质,显示阴影效果
 */
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
/**
 * PI === 180degree
 */
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(15, 0, 0);

const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-4, 3, 0);

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(20, 4, 3);

plane.receiveShadow = true;
box.castShadow = true;
sphere.castShadow = true;

scene.add(plane);
scene.add(box);
scene.add(sphere);

camera.position.set(-30, 40, 30);
camera.lookAt(scene.position);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 40, -15);
spotLight.castShadow = true;
/**
 * 控制阴影的精细程度
 */
spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
spotLight.shadow.camera.near = 40;
spotLight.shadow.camera.far = 130;

scene.add(spotLight);

document.querySelector("#webgl-output").appendChild(renderer.domElement);
renderer.render(scene, camera);
