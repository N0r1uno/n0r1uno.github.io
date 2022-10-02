import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.145.0/three.module.min.js";
import { GLTFLoader } from "./gltf.js";
const canvas = document.querySelector("#canvas"),
  wfac = 2,
  hfac = 1.35,
  meshLoader = new GLTFLoader(),
  texLoader = new THREE.TextureLoader(),
  scene = new THREE.Scene(),
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / 2 / (window.innerHeight / 1.35),
    0.1,
    1e3
  );
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !0 });
renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.35),
  renderer.setClearAlpha(0);
const light = new THREE.AmbientLight(16777215, 4);
scene.add(light);
const texture = texLoader.load("./assets/skyrimlogo.png");
(texture.flipY = !1), (texture.encoding = THREE.sRGBEncoding);
const material = new THREE.MeshLambertMaterial({
  map: texture,
  transparent: !1,
});
function onWindowResize() {
  const w = window.innerWidth / 2,
    h = window.innerHeight / 1.35;
  (camera.aspect = w / h),
    camera.updateProjectionMatrix(),
    renderer.setSize(w, h);
}
meshLoader.load(
  "./assets/skyrimlogo.glb",
  function (gltf) {
    const mesh = new THREE.Mesh(gltf.scene.children[0].geometry, material);
    scene.add(mesh);
  },
  void 0,
  function (error) {
    console.error(error);
  }
),
  window.addEventListener("resize", onWindowResize, !1);
let ctr = 0;
function animate() {
  requestAnimationFrame(animate);
    scene.rotation.y = 3.1415 + 0.5 * Math.sin(ctr);
    ctr += 0.005;
    renderer.render(scene, camera);
}
animate();
