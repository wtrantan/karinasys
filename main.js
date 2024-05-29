import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';




const scene = new THREE.Scene();
const starArr = [];
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer ({
  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
function createPlanete(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
      map: textureLoader.load(texture)
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const geometry = new THREE.TorusGeometry(15, 1, 16, 100)
const material = new THREE.MeshStandardMaterial( {color:0xFFD3D3});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)


const geometry2 = new THREE.TorusGeometry(10, 1, 16, 100)
const material2 = new THREE.MeshStandardMaterial( {color:0x91E09C});
const torus2 = new THREE.Mesh(geometry2, material2);

scene.add(torus2)

const pointLight = new THREE.PointLight(0xffffff, 50)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)

scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);
function addStar(){
  const won = new THREE.TextureLoader().load('/karina.jpeg');
  const [j, k, l] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(2));
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(j, 24, 24),
    new THREE.MeshStandardMaterial({
      map: won
    })
  );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
  starArr.push(star);


}
Array(200).fill().forEach(addStar)
function addStar2(){
  

  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star2 = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star2.position.set(x, y, z);
  scene.add(star2)

}
Array(200).fill().forEach(addStar2)
const spaceTexture = new THREE.TextureLoader().load('/space.jpg');
scene.background = spaceTexture;
const wonyoungT = new THREE.TextureLoader().load('/wonyoung.png');
const wonyoung = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: wonyoungT})
);
scene.add(wonyoung);

const moonTexture = new THREE.TextureLoader().load('/wonyoung.png');
const normalTexture = new THREE.TextureLoader().load('/wonyoung.png');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);


scene.add(moon);
const moonTexture2 = new THREE.TextureLoader().load('/moon.jpg');
const normalTexture2 = new THREE.TextureLoader().load('/normal.jpg');

const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture2,
    normalMap: normalTexture2,
  })
);
scene.add(moon2);

moon.position.z = 30;
moon.position.setX(-10);
moon2.position.z = 40;
moon2.position.setX(0);

wonyoung.position.z = -5;
wonyoung.position.x = 2;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  wonyoung.rotation.y += 0.01;
  wonyoung.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();
function animate() {
  requestAnimationFrame( animate );
  moon.rotation.x += 0.001;
  moon.rotation.y += 0.001;
  moon.rotation.z += 0.001;

  moon2.rotation.x += 0.001;
  moon2.rotation.y += 0.001;

 
  starArr.map((star) => {
    star.rotation.x += 0.001;
    star.rotation.y += 0.001;
    star.rotation.z += 0.001;  })
  
  wonyoung.rotation.y += 0.001;
  wonyoung.rotation.z += 0.001;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x += -0.01;
  torus2.rotation.y += -0.005;
  torus2.rotation.z += -0.01;
  controls.update();
  renderer.render( scene, camera );
}

animate()
