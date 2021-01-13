import { WebGLRenderer, PerspectiveCamera, Scene, Mesh, PointLight, CubeTextureLoader, MeshStandardMaterial, SmoothShading } from 'https://cdn.jsdelivr.net/npm/three/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('#c')
const scrolls = document.querySelectorAll('.s')

const loader = new GLTFLoader()
const renderer = new WebGLRenderer({
  canvas,
  alpha: true
})
const scene = new Scene()

renderer.setSize(canvas.clientWidth, canvas.clientHeight)

const camera = new PerspectiveCamera(2, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
camera.position.set(0, 200, 0)
camera.rotation.set(0, 0, 180)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false
controls.enablePan = false
controls.target.set(0, -1.25, 0)
controls.update()

const pointLight = new PointLight('white', 2)
pointLight.position.set(0, 20, 0)
scene.add(pointLight)

const env = new CubeTextureLoader().setPath( 'env/' ).load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

loader.load('stu.gltf', (gltf) => {
  const root = gltf.scene
  scene.add(root)
  scene.traverse((node) => {
    if (node.type === 'Mesh') {
      if (node.name === 'text' || node.name === 'arrow') {
        node.material = new MeshStandardMaterial({
          color: 'black',
          metalness: 0,
          roughness: 0,
          wireframe: true
        })
      } else {
        node.material = new MeshStandardMaterial({
          color: 0xffffff,
          metalness: 1,
          roughness: 0,
          envMap: env
        })
      }
    }
  })
  render()
}, undefined, (error) => {
	console.error(error)
})

function render() {
  requestAnimationFrame(render)
  camera.rotation.z += 0.0001
  /* scrolls.forEach((s) => s.scrollTop += camera.rotation.z * 100 / 2) */
  renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
  renderer.setSize(document.body.clientWidth, document.body.clientHeight)
  camera.aspect = document.body.clientWidth / document.body.clientHeight
  camera.updateProjectionMatrix()
})

c.addEventListener('wheel', (event) => {
  event.preventDefault()
  scrolls.forEach((s) => s.scrollTop += event.deltaY)
})

console.log(`%c𝒮𝓁𝒾𝒹𝑒 𝓉𝑜 𝒰𝓃𝓁𝑜𝒸𝓀 (2007-)`, 'padding: 0.5em; color: white; font-size: 2em;')
