import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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


const loader = new FontLoader();


loader.load( '/fonts/Sans_Regular.json', function ( font) {

	const geometry = new TextGeometry( 'Scroll and Drag to Move', {
		font: font,
		size: 2,
		depth: 1,
	
	} );
  const textMesh = new THREE.Mesh(geometry, [
    new THREE.MeshPhongMaterial({color: 0x694D75}),
    new THREE.MeshPhongMaterial({ color: 0x513C5A})
  ])

  textMesh.castShadow = true
  textMesh.position.y += 2
  textMesh.position.z += 20
  textMesh.position.x += 20
  textMesh.rotation.y = 15.70

  scene.add(textMesh)

 


  
} );


loader.load( '/fonts/Sans_Regular.json', function ( font) {

	const geometry = new TextGeometry( 'Project made by William Trantan', {
		font: font,
		size: 2,
		depth: 1,
	
	} );
  const textMesh = new THREE.Mesh(geometry, [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshNormalMaterial()
  ])

  textMesh.castShadow = true
  textMesh.position.y += 15
  textMesh.position.z -= 40
  textMesh.position.x = 8
  textMesh.rotation.y -= 0.5

  scene.add(textMesh)

  
} );



const geometry = new THREE.TorusGeometry(15, 1, 16, 100)
const material = new THREE.MeshPhysicalMaterial({
  color: 0xccccff,
  metalness: 0.1,
  roughness: 0.05,
  clearcoat: 1.0,
  iridescence: 1,
  clearcoatRoughness: 0.1,
  reflectivity: 1.0,
  transmission: 1.0, // glass-like transparency
  opacity: 1, // adjust to control transparency
  transparent: true
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)


const geometry2 = new THREE.TorusGeometry(10, 1, 16, 100)
const material2 = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.6,
  roughness: 0.669,
  clearcoat: 1.0,
  emissive:0x000000,
  sheenColor: 0x000000,
  ior: 2.333,
  iridescence: 1,
  iridescenceIOR:1.84,
  clearcoatRoughness: 0.01,
  reflectivity: 1.0,
  
  opacity: 1, // adjust to control transparency
  transparent: true
});
const torus2 = new THREE.Mesh(geometry2, material2);

scene.add(torus2)

const pointLight = new THREE.PointLight(0xffffff, 50)

pointLight.position.set(5,5,5)

const pointLight2 = new THREE.PointLight(0xffffff, 100)
pointLight.position.set(8,15,-40)

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(pointLight2, ambientLight)

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
const wonyoungT = new THREE.TextureLoader().load('/gojo_blue.jpg');
const wonyoung = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: wonyoungT})
);
scene.add(wonyoung);

const texture = new THREE.TextureLoader().load( '/grass.jpg' );

const material3 = new THREE.MeshStandardMaterial({
  map: texture,
  metalness:0.7,
  roughness:0.3,
})
var geometry3 = new THREE.BoxGeometry();
const mesh = new THREE.Mesh(geometry3,material3)

scene.add(mesh)

const moonTexture = new THREE.TextureLoader().load('/wonyoung.png');
const normalTexture = new THREE.TextureLoader().load('/wonyoung.png');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

   // spotlight
        const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
        spotLight.position.set(0, 25, 0);
        spotLight.castShadow = true;
        spotLight.shadow.bias = -0.0001;
        scene.add(spotLight);


 //elaina
        const loader2 = new GLTFLoader();
        loader2.load('/prison_realm__jujutsu_kaisen/scene.gltf', (gltf) => {
                const mesh = gltf.scene;
                gltf.scene.scale.set(20, 20, 20); 
                scene.add(mesh);
                mesh.position.z = -10;
                mesh.position.x = 30;
                
                function animate() {
                  requestAnimationFrame( animate );
                  mesh.rotation.y += 0.005;
                  mesh.rotation.x += 0.005;
                }
                animate()
             },
            (xhr) => {
                console.log(`loading ${(xhr.loaded / xhr.total) * 100}%`);
            },
            (error) => {
                console.error(error);
            }
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
mesh.position.z = 20;
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

  mesh.rotation.z +=0.01
  mesh.rotation.x +=0.01

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
