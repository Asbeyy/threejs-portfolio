import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui'; 
import { Textures } from './scene_components/textures';

const canvas = document.querySelector(".webgl")



/**
 * Scene
 */

export const scene = new THREE.Scene()




/**
 * Camera
 */

export const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.set(-0.61,0.99,3.44)
scene.add(camera)



/**
  * Renderer
  */

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha:true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls( camera, canvas );

window.addEventListener('resize', () =>
{
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
})















/**
 * Primitives Geometries
 */



//Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10,6),
  new THREE.MeshStandardMaterial({
    map: Textures.floorTexture,
    normalMap: Textures.floorNormal,
    roughnessMap: Textures.floorRoughness,
    displacementMap: Textures.floorDisplacement,
  })
)
floor.receiveShadow = true
floor.position.y = -1.3
floor.position.z = 2
floor.rotation.x = - Math.PI / 2
scene.add(floor)



//Walls
const wallMaterial = new THREE.MeshStandardMaterial({
  map: Textures.wallTexture,
  normalMap: Textures.wallNormal,
  roughnessMap: Textures.wallRoughness,
  color: 'black',
  roughness: 0.7,
})
const wallGeometry =  new THREE.PlaneGeometry(10,10)


// Backgroudn Wall
const wall = new THREE.Mesh( wallGeometry, wallMaterial )

wall.receiveShadow = true
wall.position.z = -1
wall.position.y = 3.7
scene.add(wall)

//Side Wall L
const wallLeft = new THREE.Mesh(wallGeometry,wallMaterial)
wallLeft.rotation.y = Math.PI / 2
wallLeft.position.x = -5
scene.add(wallLeft)




//Project Paintings
export const painting = new THREE.Mesh(
  new THREE.PlaneGeometry(2,1.4),
  new THREE.MeshNormalMaterial({
  })
)

painting.position.x = -5.05
painting.position.z = 2.1
painting.position.y = 0.8
painting.rotation.y = Math.PI / 2
scene.add(painting)





































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



