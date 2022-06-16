import * as THREE from "three";
import { GLTFLoader } from "./gltf.js";

const canvas = document.querySelector("#canvas");

const wfac = 2;
const hfac = 1.35;

const meshLoader = new GLTFLoader();
const texLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / wfac / (window.innerHeight / hfac),
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth / wfac, window.innerHeight / hfac);
renderer.setClearAlpha(0);

const light = new THREE.AmbientLight(0xffffff, 3);
scene.add(light);

const texture = texLoader.load("./assets/skyrimlogo.png");
texture.flipY = false;
texture.encoding = THREE.sRGBEncoding;
const material = new THREE.MeshLambertMaterial({
  map: texture,
  transparent: false,
});

meshLoader.load(
  "./assets/skyrimlogo.glb",
  function (gltf) {
    const mesh = new THREE.Mesh(gltf.scene.children[0].geometry, material);
    scene.add(mesh);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  const w = window.innerWidth / wfac;
  const h = window.innerHeight / hfac;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.005;
  renderer.render(scene, camera);
}

animate();
