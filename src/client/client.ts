import * as THREE from "three";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = 2; // the canvas default
const near = 1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 150, 300);

const scene = new THREE.Scene();
scene.background = new THREE.Color("lightskyblue");

{
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

const tree = [
  { length: 100, angle: 0, branches: 3 }, // root
  { length: 100, angle: 0, branches: 3 }, // root
  { length: 50, angle: 0.67, branches: 0 }, // 1st child branch
  { length: 50, angle: 0, branches: 0 }, // 2nd child branch
  { length: 50, angle: -0.67, branches: 0 }, // 3rd child branch
  { length: 50, angle: 0.67, branches: 3 }, // second branch
  { length: 50, angle: 0.67, branches: 0 }, // 1st child branch
  { length: 50, angle: 0, branches: 0 }, // 2nd child branch
  { length: 50, angle: -0.67, branches: 0 }, // 2nd child branch
  { length: 40, angle: -0.67, branches: 0 }, // third branch
];

function addBranch(parent: any, offset: any, tree: any, ndx = 0) {
  const { length, angle, branches } = tree[ndx];

  const material = new THREE.MeshPhongMaterial({
    color: "#ff0000",
  });
  const geometry = new THREE.CylinderGeometry(2, 2, length, 20, 1, false);
  geometry.translate(0, length / 2, 0);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = offset;
  mesh.rotation.z = angle;
  parent.add(mesh);
  for (let i = 0; i < branches; ++i) {
    ndx = addBranch(mesh, length, tree, ++ndx);
  }
  return ndx;
}
addBranch(scene, 0, tree);

function resizeRendererToDisplaySize(renderer: any) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
}

requestAnimationFrame(render);
