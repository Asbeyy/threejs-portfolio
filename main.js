import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui'; 
import { gsap } from 'gsap';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { ScrollTrigger } from 'gsap/all';

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
camera.position.set(-2.61,0.99,2.44)
scene.add(camera)





/**
 * Textures
 */
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
//scene.add( axesHelper );


window.addEventListener('resize', () =>
{
 

    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
})





/**
 * Lights
 */

const pointLight = new THREE.PointLight('#ffffff',0.3)
pointLight.castShadow = true
pointLight.shadow.bias = -0.00001
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;

pointLight.scale.set(0.1,0.1,0.1)
pointLight.position.y = 1.5
pointLight.position.z = 1.7

const width = 1.7;
const height = 0.6;
const intensity = 10;
const rectLight = new THREE.RectAreaLight( 0xff0000, intensity,  width, height );
rectLight.position.set( 0, .85, -0.6 );
rectLight.lookAt( 0, 0.55, -1 );

const helper = new THREE.PointLightHelper(pointLight)


const spotLight = new THREE.SpotLight( 0xffffff , 2, 2, Math.PI * 0.2, 0.25, 1);
spotLight.position.set( -0.70, 0.60, 0.05 );
spotLight.target.position.z = 0.2
spotLight.target.position.x = -0.2
spotLight.target.position.y = 0
scene.add(spotLight.target)

const spotLightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( spotLightHelper );




scene.add( spotLight );
scene.add( rectLight, pointLight )












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



//Wall
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
		size: 0.6,
		height: 0.05,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.089,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 10
	} );

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
    model.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    
    
		scene.add( gltf.scene );
   
    gltf.scene.scale.set(0.1,0.1,0.1)
    
    desk.position.y = -0.85
    desk.position.x = 0.2
    desk.position.z = 0.40
   

		gltf.animations; 
		gltf.scene; 
		gltf.scenes;
		gltf.cameras; 
		gltf.asset; 

	}
);




/**
 * GSAP
 */
window.addEventListener("keydown", (e) => {
  if (e.key === "p"){
    gsap.to(camera.position, {x: -3, z:1, duration: 3})
  }
  if (e.key === "o"){
    gsap.to(camera.position, {x: 0, y:0.5, z:3, duration: 3})
  }
})





function desktopAnimation(){
  //pos cam

  //pos desk

  //Scroll GSAP
  
  gsap.registerPlugin(ScrollTrigger);

  let section = 0

  const tl = new gsap.timeline({
    defaults:{
      duration: 1,
      ease: "power2.inOut",
    },
    scrollTrigger: {
      trigger: ".page",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.01,
      markers: true,

    }
  })

  tl.to(camera.position, {x:-2.61, y:0.99, z:2.44}, section)
  tl.to(camera.rotation, {x:-0.02, y:0, z:0}, section)
  
  
  section+= 1
  tl.to(camera.position, {x:2.97, y:0.70, z:2.05}, section)
  tl.to(camera.rotation, {x:0.02, y:0.84, z:-0.01}, section)


  section+=1
  tl.to(camera.position, {x:-1.11, y:0.52, z:1.19}, section)
  tl.to(camera.rotation, {x:-0.5, y:-0.71, z:-0.34}, section)

  section+=1
  tl.to(camera.position, {x:-1.45, y:1.54, z:5.47}, section)
  tl.to(camera.rotation, {x:-0.28, y:-0.44, z:-0.12}, section)


  section+=1
  tl.to(camera.position, {x:0.23, y:4.86, z:0.23}, section)
  tl.to(camera.rotation, {x:-1.57, y:0, z:-3.14}, section)

  section+=1
  tl.to(camera.position, {x:0.29, y:1.45, z:-3.44}, section)
  tl.to(camera.rotation, {x:-2.78, y:0.03, z:3.13}, section)

}

desktopAnimation()



/**
 * Animate
 */
const animate = () => {

  // console.log((camera.rotation.x).toFixed(2),camera.rotation.y.toFixed(2),camera.rotation.z.toFixed(2))
  // console.log((camera.position.x).toFixed(2),camera.position.y.toFixed(2),camera.position.z.toFixed(2))

  renderer.render(scene,camera)
  window.requestAnimationFrame(animate)
}

animate()



// init0,0.5,3

/**
 * p: -2.61,0.99,2.44, r: -0.02, 00.1 ,0.00
 * p: 2.97, 0.70, 2.05, r: 0.02, 0.84, -0.01
 * p: -1.11, 0.52, 1.19, r: -0.5, -0.71, -0.34
 * 
 * p: -1.45, 1.54, 5.47, r: -0.28, -0.44, -0.12
 * p: 0.23, 4.86, 0.23, r: -1.57,0, -3.14
 * 
 * 
 * 
 * missing
 * p: 0.29, 1.45, -3.44, r: -278, 0.03, 3.13
 * p: 0.59, 3.58, -7.81, r: -2.78, 0.06, 3.12
 */