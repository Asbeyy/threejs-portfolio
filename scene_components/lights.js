import * as THREE from 'three'
import { scene } from '../main'
// import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';



/**
 * Pointlight
 */
const pointLight = new THREE.PointLight('#ffffff',0.3)
pointLight.castShadow = true
pointLight.shadow.bias = -0.00001
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;

pointLight.scale.set(0.1,0.1,0.1)
pointLight.position.y = 1.5
pointLight.position.z = 1.7

const helper = new THREE.PointLightHelper(pointLight)
// scene.add(helper)





/**
 * RectLight
 */
const width = 1.9;
const height = 0.7;
const intensity = 20;
const rectLight = new THREE.RectAreaLight( 0xff0000, intensity,  width, height );
rectLight.position.set( 0.22, .7, -0.99 );
rectLight.lookAt( 0.22, 0.7, 0.9 );





/**
 * SpotLight 
 */
const spotLight = new THREE.SpotLight( 0xffffff , 2, 2, Math.PI * 0.2, 0.25, 1);
spotLight.position.set( -0.70, 0.60, 0.05 );
spotLight.target.position.z = 0.2
spotLight.target.position.x = -0.2
spotLight.target.position.y = 0
scene.add(spotLight.target)

const spotLightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( spotLightHelper );







scene.add( spotLight );
scene.add(  pointLight )
scene.add(  rectLight )
