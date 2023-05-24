import * as THREE from 'three'

/**
 * Textures
 */
const TextureLoader = new THREE.TextureLoader()

 export const Textures = {
    wallTexture: TextureLoader.load('textures/bricks/color.jpg'),
    wallNormal: TextureLoader.load('textures/bricks/normal.jpg'),
    wallRoughness: TextureLoader.load('textures/bricks/roughness.jpg'),
    floorTexture: TextureLoader.load('textures/floor/floor_color.jpg'),
    floorNormal: TextureLoader.load('textures/floor/floor_normal.jpg'),
    floorRoughness: TextureLoader.load('textures/floor/floor_roughness.jpg'),
    floorDisplacement: TextureLoader.load('textures/floor/floor_displacement.jpg'),

}


Textures.floorTexture.wrapS = THREE.RepeatWrapping
Textures.floorTexture.wrapT  = THREE.RepeatWrapping
Textures.floorTexture.repeat.set(2,4)
Textures.floorNormal.wrapS = THREE.RepeatWrapping
Textures.floorNormal.wrapT  = THREE.RepeatWrapping
Textures.floorNormal.repeat.set(2,4)
Textures.floorRoughness.wrapS = THREE.RepeatWrapping
Textures.floorRoughness.wrapT  = THREE.RepeatWrapping
Textures.floorRoughness.repeat.set(2,4)
Textures.floorDisplacement.wrapS = THREE.RepeatWrapping
Textures.floorDisplacement.wrapT  = THREE.RepeatWrapping
Textures.floorDisplacement.repeat.set(2,4)

Textures.wallNormal.wrapS = THREE.RepeatWrapping;
Textures.wallNormal.wrapT = THREE.RepeatWrapping;
Textures.wallNormal.repeat.set( 2, 1 );
Textures.wallRoughness.wrapS = THREE.RepeatWrapping;
Textures.wallRoughness.wrapT = THREE.RepeatWrapping;
Textures.wallRoughness.repeat.set( 2, 1)
Textures.wallTexture.wrapS = THREE.RepeatWrapping;
Textures.wallTexture.wrapT = THREE.RepeatWrapping;
Textures.wallTexture.repeat.set( 2, 1 );