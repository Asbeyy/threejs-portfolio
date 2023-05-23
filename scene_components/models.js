import { scene } from "../main";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from 'three'


/**
 * Settings
 */

const models_settings = {
  desk: true,
  fridge: true,
}




/**
 * Loaders
 */
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'node_modules/three/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );





/**
 * Desk
 */
let desk;
if (models_settings.desk === true){

  loader.load(
    'models/desk/scene_five.gltf',
  
    function ( gltf ) {
      const desk = gltf.scene;    
      scene.add( gltf.scene );
  
      desk.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      
      desk.scale.set(0.1,0.1,0.1)
      desk.position.y = -0.85
      desk.position.x = 0.2
      desk.position.z = 0.40
    },
    function ( xhr ) {
      if (xhr.loaded / xhr.total * 100 === 100){
        console.log( 'Desk Setup Load Complete' );
      }
    },
    function ( error ) {
      console.log( 'An error happened' );
    }
  );

}








/**
 * Fridge
 */
const mixer = new THREE.AnimationMixer();
const clock = new THREE.Clock()

if (models_settings.fridge === true){

  loader.load(
    'models/retro_fridge/scene.gltf',
    function ( gltf ) {
      let model= gltf.scene
      scene.add( model );

      model.scale.set(.8,.8,.8)
      model.position.x = -4
      model.position.y = -0.1
      model.position.z = -0.3
      model.rotation.y = - Math.PI *0.25
     
    },
    function ( xhr ) {
      if (xhr.loaded / xhr.total * 100 === 100){
        console.log( 'Arcade Machine Load Complete' );
      }
    },
    function ( error ) {
      console.log( 'An error happened', error );
    }
  );

}








/**
 * Animate LOOP
 */

function animate() {
  requestAnimationFrame(animate);
  
  const deltaTime = clock.getDelta();
  mixer.update(deltaTime);
}
animate();
