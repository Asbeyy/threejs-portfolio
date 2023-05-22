import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui'; 
import { gsap } from 'gsap';
import { clamp } from 'three/src/math/MathUtils';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const canvas = document.querySelector(".webgl")



const parameters = {
  lightX: 0.5,
  lightY: 14.5,
  lightZ: -4.5,
}


/**
 * Scene
 */

const scene = new THREE.Scene()




/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.set(0.5,0.5,3)

scene.add(camera)


/**Textures */
const TextureLoader = new THREE.TextureLoader()
const wallTexture = TextureLoader.load('textures/bricks/color.jpg')
const wallNormal = TextureLoader.load('textures/bricks/normal.jpg')
const wallRoughness = TextureLoader.load('textures/bricks/roughness.jpg')

const floorTexture = TextureLoader.load('textures/floor/floor_color.jpg')
const floorNormal = TextureLoader.load('textures/floor/floor_normal.jpg')
const floorRoughness = TextureLoader.load('textures/floor/floor_roughness.jpg')
const floorDisplacement = TextureLoader.load('textures/floor/floor_displacement.jpg')

floorTexture.wrapS = THREE.RepeatWrapping
floorTexture.wrapT  = THREE.RepeatWrapping
floorTexture.repeat.set(2,4)
floorNormal.wrapS = THREE.RepeatWrapping
floorNormal.wrapT  = THREE.RepeatWrapping
floorNormal.repeat.set(2,4)
floorRoughness.wrapS = THREE.RepeatWrapping
floorRoughness.wrapT  = THREE.RepeatWrapping
floorRoughness.repeat.set(2,4)
floorDisplacement.wrapS = THREE.RepeatWrapping
floorDisplacement.wrapT  = THREE.RepeatWrapping
floorDisplacement.repeat.set(2,4)



wallNormal.wrapS = THREE.RepeatWrapping;
wallNormal.wrapT = THREE.RepeatWrapping;
wallNormal.repeat.set( 2, 2 );
wallRoughness.wrapS = THREE.RepeatWrapping;
wallRoughness.wrapT = THREE.RepeatWrapping;
wallRoughness.repeat.set( 2, 2)
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set( 2, 2 );










/**
 * Renderer
*/

const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//controls
const controls = new OrbitControls( camera, canvas );
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );








/**
 * Lights
 */

const pointLight = new THREE.PointLight('#ffffff',0.4)
pointLight.castShadow = true
pointLight.shadow.bias = -0.00001
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

const ambientLight = new THREE.AmbientLight('#ffffff',0.2)

pointLight.scale.set(0.1,0.1,0.1)
pointLight.position.y = 1
pointLight.position.z = 1

const helper = new THREE.PointLightHelper(pointLight)

scene.add(pointLight)





const width = 1.7;
const height = 0.6;
const intensity = 10;
const rectLight = new THREE.RectAreaLight( 0xff0000, intensity,  width, height );
rectLight.position.set( 0, .85, -0.6 );
rectLight.lookAt( 0, 0.55, -1 );
scene.add( rectLight )
















/**
 * Primitives Geometries
 */




//Floor

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10,6),
  new THREE.MeshStandardMaterial({
    map: floorTexture,
    normalMap: floorNormal,
    roughnessMap: floorRoughness,
    displacementMap: floorDisplacement,
  })
)
floor.receiveShadow = true
floor.position.y = -1.3
floor.position.z = 2
floor.rotation.x = - Math.PI / 2
scene.add(floor)


const wall = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10),
  new THREE.MeshStandardMaterial({
    map: wallTexture,
    normalMap: wallNormal,
    roughnessMap: wallRoughness,
    color: 'black',
    roughness: 0.7,
  })
)
wall.receiveShadow = true
wall.position.z = -1
wall.position.y = 3.7
scene.add(wall)



/**
 * TEXT
 */

const fontLoader = new FontLoader();


fontLoader.load( 'Neon.json', function ( font ) {

	const textGeometry = new TextGeometry( 'Fede', {
		font: font,
		size: 0.5,
		height: 0.1,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.01,
		bevelSize: 0.01,
		bevelOffset: 0,
		bevelSegments: 10
	} );


  // Create a custom shader material for the neon effect
  const neonMaterial = new THREE.MeshStandardMaterial({
    emissive: '#ff0000',
    emissiveIntensity: 0.2,
    color: "#ff0000"
  })

  const textMesh = new THREE.Mesh(textGeometry, neonMaterial);
  textMesh.position.x = -0.75
  textMesh.position.z = -1.03
  textMesh.position.y = .4
  scene.add(textMesh);

} );






/** 
 * 3D Models
 */

const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'node_modules/three/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

let desk;
loader.load(
	'scene_two.gltf',
	function ( gltf ) {
    
    const model = gltf.scene;
    desk = model
    desk.position.y = -0.85
    desk.position.x = 0.41
    desk.position.z = 0.40

    model.traverse((node) => {
      if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
		scene.add( gltf.scene );
    gltf.scene.scale.set(0.1,0.1,0.1)

   

		gltf.animations; 
		gltf.scene; 
		gltf.scenes;
		gltf.cameras; 
		gltf.asset; 
    console.log(desk)

	}
);










/**
 * Animate
 */
const animate = () => {

 

  renderer.render(scene,camera)
  window.requestAnimationFrame(animate)
}

animate()