import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffff00); //0x is needed at the begining
scene.add(new THREE.AxesHelper(5));
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 2;

const renderer = new THREE.WebGLRenderer(); // default renderer
renderer.setSize(window.innerWidth, window.innerHeight); // fills the whole space
document.body.appendChild(renderer.domElement);
// renderer dome element is a canvas that can be dynamicly added to html

new OrbitControls(camera, renderer.domElement); // control the shape

const geometry = new THREE.Mesh(
  new THREE.CylinderGeometry(0.01, 0.01, 2),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
const geometryOneLeft = new THREE.Mesh(
  new THREE.CylinderGeometry(0.01, 0.01, 0.4),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);

const geometryOneRight = new THREE.Mesh(
  new THREE.CylinderGeometry(0.01, 0.01, 0.4),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);

const geometryTwoLeft = new THREE.Mesh(
  new THREE.CylinderGeometry(0.01, 0.01, 0.4),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
const geometryTwoRight = new THREE.Mesh(
  new THREE.CylinderGeometry(0.01, 0.01, 0.4),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
const geometryTreeLeft = new THREE.Mesh(
  new THREE.CylinderGeometry(0.01, 0.01, 0.4),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
const geometryTreeRight = new THREE.Mesh(
  new THREE.CylinderGeometry(0.01, 0.01, 0.4),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);

const geometryOneLeft1 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.01, 0.01, 0.2),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);

geometryOneLeft.rotateZ(60);
geometryOneRight.rotateZ(-60);
geometryTwoLeft.rotateZ(60);
geometryTwoRight.rotateZ(-60);
geometryTreeLeft.rotateZ(60);
geometryTreeRight.rotateZ(-60);

geometryOneLeft1.rotateZ(120);

geometry.position.set(0, 0.75, 0);

geometryOneLeft.position.set(-0.06, 0, 0);
geometryOneRight.position.set(0.06, 0.1, 0);
geometryTwoLeft.position.set(-0.06, 0.3, 0);
geometryTwoRight.position.set(0.06, 0.4, 0);
geometryTreeLeft.position.set(-0.06, 0.6, 0);
geometryTreeRight.position.set(0.06, 0.8, 0);

geometryOneLeft1.position.set(-0.11, 0.06, 0);

geometry.add(geometryOneLeft);
geometry.add(geometryOneRight);
geometry.add(geometryTwoLeft);
geometry.add(geometryTwoRight);
geometry.add(geometryTreeLeft);
geometry.add(geometryTreeRight);
geometry.add(geometryOneLeft1);

// const cone = new THREE.Mesh(geometry, material); // add mesh to the scene

scene.add(geometry);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
const stats = Stats();
function animate() {
  requestAnimationFrame(animate);
  document.body.appendChild(stats.dom);

  // cone.rotation.x += 0.01;
  // cone.rotation.y += 0.01;
  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
