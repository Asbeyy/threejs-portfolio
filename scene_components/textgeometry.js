import * as THREE from 'three'
import { scene } from '../main';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


/**
 * Loaders
 */
const fontLoader = new FontLoader();





/**
 * FEDE NEON TEXT
 */
fontLoader.load( 'fonts/Neon.json', function ( font ) {
	const textGeometry = new TextGeometry( 'Fede', {
		font: font,
		size: 0.6,
		height: 0.001,
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
    color: "#ff0000",
    opacity: 0.1
  })
  
  const textMesh = new THREE.Mesh(textGeometry, neonMaterial);
  textMesh.position.x = -0.75
  textMesh.position.z = -0.98
  textMesh.position.y = .4
  scene.add(textMesh);

} );






/**
 * PROJECT TEXT
 */

fontLoader.load( 'fonts/Neon.json', function ( font ) {
	const textGeometry = new TextGeometry( 'Projects', {
		font: font,
		size: 0.2,
		height: 0.05,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.089,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 10
	} );

  const neonMaterial = new THREE.MeshStandardMaterial({
    emissive: '#ffffff',
    emissiveIntensity: 0.5,
    color: "#ffffff"
  })
  
  const textMesh = new THREE.Mesh(textGeometry, neonMaterial);
  textMesh.position.x = -5.0
  textMesh.position.z = 2.70
  textMesh.position.y = 1.7
  textMesh.rotation.y = Math.PI / 2
  scene.add(textMesh);

} );