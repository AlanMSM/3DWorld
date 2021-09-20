import * as THREE from './ThreeJS/three.module.js';
import {OrbitControls} from './ThreeJS/OrbitControls.js';

let scene, camera, renderer, selectedBg;

function init(){
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.updateShadowMap.enabled = true;
    renderer.updateShadowMap.type=THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", resize, false);

    scene = new THREE.Scene();

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(75,20,0);
    
    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    scene.add(light)

    light = new THREE.AmbientLight(0x101010);
    scene.add(light);

    var controls = new OrbitControls(camera,renderer.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
    './background/arid2_ft.jpg',
    './background/arid2_bk.jpg',
    './background/arid2_up.jpg',
    './background/arid2_dn.jpg',
    './background/arid2_rt.jpg',
    './background/arid2_lf.jpg'
    ]);
    scene.background=texture;

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
        }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // const box = new THREE.Mesh(
    //     new THREE.BoxGeometry(2,2,2),
    //     new THREE.MeshStandardMaterial({
    //         color: 0xffffff,
    //     }));
    // box.position.set(0, 1, 0);
    // box.castShadow = true;
    // box.receiveShadow = true;
    // scene.add(box);

    for (let x = -8; x < 8; x++) {
        for (let y = -8; y < 8; y++) {
          const box = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshStandardMaterial({
                color: 0x808080,
            }));
          box.position.set(Math.random() + x * 5, Math.random() * 4.0 + 2.0, Math.random() + y * 5);
          box.castShadow = true;
          box.receiveShadow = true;
          scene.add(box);
        }
      }

    const box = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshStandardMaterial({
          color: 0xFFFFFF,
          wireframe: true,
          wireframeLinewidth: 4,
      }));
    box.position.set(0, 0, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box);

    animate();
}

function animate(){
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

function resize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.render(scene,camera);
}

init();