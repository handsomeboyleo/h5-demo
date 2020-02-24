 /*
              Most of the stuff in here is just bootstrapping. Essentially it's just
              setting ThreeJS up so that it renders a flat surface upon which to draw 
              the shader. The only thing to see here really is the uniforms sent to 
              the shader. Apart from that all of the magic happens in the HTML view
              under the fragment shader.
              */

var container = void 0;
var camera = void 0,scene = void 0,renderer = void 0;
var uniforms = void 0;

var loader = new THREE.TextureLoader();
var texture = void 0;
loader.setCrossOrigin("anonymous");
loader.load(
'noise.png',
function do_something_with_texture(tex) {
  texture = tex;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  init();
  animate();
});


function init() {
  container = document.getElementById('container');

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_noise: { type: "t", value: texture },
    u_mouse: { type: "v2", value: new THREE.Vector2() } };


  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent });

  material.extensions.derivatives = true;

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  document.addEventListener('pointermove', function (e) {
    var ratio = window.innerHeight / window.innerWidth;
    uniforms.u_mouse.value.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
    uniforms.u_mouse.value.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;

    e.preventDefault();
  });
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setSize( 1000, 1000 );
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate(delta) {
  requestAnimationFrame(animate);
  render(delta);
}






var capturer = new CCapture({
  verbose: true,
  framerate: 30,
  // motionBlurFrames: 4,
  quality: 90,
  format: 'webm',
  workersPath: 'js/' });

var capturing = false;

isCapturing = function isCapturing(val) {
  if (val === false && window.capturing === true) {
    capturer.stop();
    capturer.save();
  } else if (val === true && window.capturing === false) {
    capturer.start();
  }
  capturing = val;
};
toggleCapture = function toggleCapture() {
  isCapturing(!capturing);
};

window.addEventListener('keyup', function (e) {if (e.keyCode == 68) toggleCapture();});

var then = 0;
function render(delta) {

  uniforms.u_time.value = -11000 + delta * 0.0005;
  renderer.render(scene, camera);

  if (capturing) {
    capturer.capture(renderer.domElement);
  }
}