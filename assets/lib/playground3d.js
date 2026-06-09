/* Scène 3D du playground — modèle Raspberry Pi 5 (GLB meshopt).
   Module ES, chargé via importmap. Remplace l'ancien cube CSS. */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const canvas = document.getElementById('rpiCanvas');

// Détection WebGL : si indisponible (rare, ou rendu headless), on masque
// proprement le canvas plutôt que de laisser Three.js lever des erreurs.
let glOK = false;
try {
  const probe = document.createElement('canvas');
  glOK = !!(window.WebGLRenderingContext && (probe.getContext('webgl') || probe.getContext('experimental-webgl')));
} catch (e) { glOK = false; }

if (canvas && !glOK) {
  canvas.style.display = 'none';
  document.getElementById('pgHint')?.classList.add('hide');
}

if (canvas && glOK) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrap = canvas.parentElement;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(3.2, 2.2, 4.2);

  // Éclairage : doux + chaud (sunset) + appoint froid pour le contraste
  scene.add(new THREE.HemisphereLight(0xfff0e0, 0x20140c, 1.05));
  const key = new THREE.DirectionalLight(0xffb070, 2.2); key.position.set(5, 6, 4); scene.add(key);
  const fill = new THREE.DirectionalLight(0x88aaff, 0.7); fill.position.set(-5, 2, -3); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xff5a1f, 1.0); rim.position.set(0, -3, -5); scene.add(rim);

  function resize() {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 2.2;
  controls.maxDistance = 8;
  controls.autoRotate = !reduce;
  controls.autoRotateSpeed = 1.4;

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load('assets/models/raspberry-pi-5.glb?v=3', (gltf) => {
    const model = gltf.scene;

    // Centrer + mettre à l'échelle pour tenir dans une boîte unité
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.6 / maxDim;
    model.scale.setScalar(scale);
    model.position.sub(center.multiplyScalar(scale));
    // Léger redressement (les exports CAO sont souvent à plat sur Z)
    model.rotation.x = -Math.PI / 2;

    scene.add(model);
    document.getElementById('pgHint')?.classList.remove('hide');
    resize();
  }, undefined, (err) => {
    console.warn('Modèle 3D non chargé :', err?.message || err);
    document.getElementById('pgStage')?.classList.add('pg-3d-failed');
  });

  // Masquer l'indice après la première interaction
  let touched = false;
  const hideHint = () => { if (!touched) { touched = true; document.getElementById('pgHint')?.classList.add('hide'); } };
  canvas.addEventListener('pointerdown', hideHint);

  if (window.ResizeObserver) new ResizeObserver(resize).observe(wrap);
  else window.addEventListener('resize', resize);
  resize();

  (function loop() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  })();
}
