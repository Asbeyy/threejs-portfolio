import { scene } from "../main";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from 'three'


/**
 * Settings
 */

const models_settings = {
  desk: true,
  living: false,
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

if (models_settings.living === true){

  loader.load(
    'models/livingroom/living-room.gltf',
    function ( gltf ) {
      let model= gltf.scene
      scene.add( model );

      model.scale.set(.25,.25,.25)
      model.position.x = -2.5
      model.position.y = -0.85
      model.position.z = 2.18
      model.rotation.y = - Math.PI / 2
     
    },
    function ( xhr ) {
      if (xhr.loaded / xhr.total * 100 === 100){
        console.log( 'Living room Load Complete' );
      }
    },
    function ( error ) {
      console.log( 'An error happened', error );
    }
  );

}






