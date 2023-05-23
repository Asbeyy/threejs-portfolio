import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

//Import all assets meshes to move with gsap
import { camera, painting } from '../main';




//This is desktopAnimation
function desktopAnimation(){
    
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

    tl.to(camera.position, {x:-2.78, y:0.21, z:2.30}, section)
    tl.to(camera.rotation, {x:-0.07, y:0.07, z:0.01}, section)
    tl.to(painting.position, {x:-4.9}, section)
    
    //Section 2
    section+=1
    tl.to(camera.position, {x:0.23, y:0.76, z:3.0}, section)
    tl.to(camera.rotation, {x:-0.24, y:1.21, z:0.22}, section)
  
    //Section3 
    section+= 1
    tl.to(camera.position, {x:2.97, y:0.70, z:2.05}, section)
    tl.to(camera.rotation, {x:0.02, y:0.84, z:-0.01}, section)
    
    //Section4
    section+=1
    tl.to(painting.position, {x:-5.11}, section)
    tl.to(camera.position, {x:-1.11, y:0.52, z:1.19}, section)
    tl.to(camera.rotation, {x:-0.5, y:-0.71, z:-0.34}, section)
  
    //Section5
    section+=1
    tl.to(camera.position, {x:-1.45, y:1.54, z:5.47}, section)
    tl.to(camera.rotation, {x:-0.28, y:-0.44, z:-0.12}, section)
  
    //Section6
    section+=1
    tl.to(camera.position, {x:0.23, y:4.86, z:0.23}, section)
    tl.to(camera.rotation, {x:-1.57, y:0, z:-3.14}, section)
    
    //Section7
    section+=1
    tl.to(camera.position, {x:0.29, y:1.45, z:-3.44}, section)
    tl.to(camera.rotation, {x:-2.78, y:0.03, z:3.13}, section)
  
  }
  






  //Create and if that check if to load desktopAnimation or PhoneAnimation
  
  desktopAnimation()






  /**
   * References
   */


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
