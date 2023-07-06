import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

//create scene
const scene = new THREE.Scene()
scene.background = new THREE.Color()
scene.add(new THREE.AxesHelper(5))


// lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

//set camera settings
const camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2



//create renderer
const renderer = new THREE.WebGLRenderer({alpha: true})
renderer.useLegacyLights = false
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)



//add controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

//load model
const loader = new GLTFLoader()
loader.load(
    'models/blast-furnace.glb',
    function (gltf) {
        gltf.scene.scale.set(0.1, 0.1, 0.1)
        gltf.scene.position.set(0, 0, -2)
        gltf.scene.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                const m = child as THREE.Mesh
                m.receiveShadow = true
                m.castShadow = true
                console.log('first')
            }

            if ((child as THREE.Light).isLight) {
                const l = child as THREE.Light
                l.castShadow = true
                // @ts-ignore
                l.shadow.bias = -0.003
                // @ts-ignore
                l.shadow.mapSize.width = 2048
                // @ts-ignore
                l.shadow.mapSize.height = 2048
                console.log('second')
            }

        })
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        console.log('loading model')
    },
    (error) => {
        console.log(error)
    }
)

//add resize listener
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
    stats.update()
}
function render() {
    renderer.render(scene, camera)
}
animate()
