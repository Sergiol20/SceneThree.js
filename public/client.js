//Proyecto 2 realizado por: Sergio López 8-974-485 y José Campos 8-983-574
//librerias
import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import {OBJLoader} from './jsm/loaders/OBJLoader.js'
import{MTLLoader} from './jsm/loaders/MTLLoader.js'
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js'
import { RenderPass } from './jsm/postprocessing/RenderPass.js'
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from './jsm/postprocessing/UnrealBloomPass.js'
import { SepiaShader } from './jsm/shaders/SepiaShader.js'

//se setea la camara
const scene = new THREE.Scene() 
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)
camera.position.z = 20
camera.position.x = 60
camera.position.y=15

window.addEventListener('resize', onWindowResize, false)
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


const stats = Stats()
document.body.appendChild(stats.dom)    


const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)
renderer.shadowMap.enabled = true;


//se agrega el post procesamiento, el effect composer y el Render pass
const Composer = new EffectComposer(renderer)
const renderpass = new RenderPass(scene, camera)
Composer.addPass(renderpass)

//un filtro blompass para aumentar la exposición de la escena y se pueda apreciar con mas brillosidad
const bloompass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.2,
    0.2,
    0.1,
    1
)
Composer.addPass(bloompass)

//un sepia shader para que la escena se muestre más anaranjada debido al encontrarse en un atardecer
const shaderSepia =  SepiaShader
const effectSepia = new ShaderPass( shaderSepia )
effectSepia.uniforms[ 'amount' ].value = 0.4;
Composer.addPass(effectSepia)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enabledamping = true


//Luz para la lampara del poste
const spotLight = new THREE.SpotLight(0xffff00, 3, 25, Math.PI/6, 0.5, 1.0)
spotLight.position.set(29, 7, 17);
spotLight.target.position.set(20, -15, 17);
scene.add(spotLight);
scene.add(spotLight.target);

//Luz para la fogata
const spotLight2 = new THREE.SpotLight(0xffff65, 2, 25, Math.PI/8, 0.5, 2.0)
spotLight2.position.set(26, 7, 13);
spotLight2.target.position.set(35, -15, -7);
scene.add(spotLight2);
scene.add(spotLight2.target);

//Luz correspondiente al sol para generar sombras 
const pointLight = new THREE.PointLight(0xf39f18, 4, 100);
pointLight.position.set(-50, 40, 10)
pointLight.castShadow=true;
scene.add(pointLight);

//hemispherelight para que el ambiente sea controlado por luz superior y luz inferior
scene.add(new THREE.HemisphereLight(0xf39f18, 0x080820, 1))

//se agrega el skybox
const material = new THREE.CubeTextureLoader().setPath('texturas/').load( [
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
  ] );

scene.background = material


const mtlLoader = new MTLLoader();
//objeto arbol
mtlLoader.load(
    'models/tree.mtl', (material) => {
        material.preload()
        console.log(material)
        const objLoder = new OBJLoader()
        objLoder.setMaterials(material)
        objLoder.load(

            'models/tree.obj', (object)=>{
                object.position.set(10,0.1,-5);
                object.traverse(function(child){
                    child.castShadow = true;
                    child.receiveShadow = true;
                });
                scene.add(object)
            },
            (xhr)=>{
                console.log((xhr.loaded/xhr.total)* 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
)
//objeto cabaña
mtlLoader.load(
    'models/cabaña.mtl', (material) => {
        material.preload()
        console.log(material)
        const objLoder = new OBJLoader()
        objLoder.setMaterials(material)
        objLoder.load(
            
            'models/cabaña.obj', (object)=>{
                object.position.set(10,0,10)
                object.rotation.y = 1
                object.traverse(function(child){
                    child.castShadow = true;
                    child.receiveShadow = true;
                });
                scene.add(object)
            },
            (xhr)=>{
                console.log((xhr.loaded/xhr.total)* 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
)
//objeto isla
mtlLoader.load(
    'models/Plano.mtl', (material) => {
        material.preload()
        console.log(material)
        const objLoder = new OBJLoader()
        objLoder.setMaterials(material)
        objLoder.load(
            
            'models/Plano.obj', (object)=>{
                object.position.set(15,0,15)
                object.traverse(function(child){
                    child.castShadow = true;
                    child.receiveShadow = true;
                });
                scene.add(object)
            },
            (xhr)=>{
                console.log((xhr.loaded/xhr.total)* 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
)
//objeto obeja 1
mtlLoader.load(
    'models/sheep.mtl', (material) => {
        material.preload()
        console.log(material)
        const objLoder = new OBJLoader()
        objLoder.setMaterials(material)
        objLoder.load(
            
            'models/sheep.obj', (object)=>{
                object.position.set(20,-0.25,-10)
                object.rotation.y=5
                object.traverse(function(child){
                    child.castShadow = true;
                    child.receiveShadow = true;
                });
                scene.add(object)
            },
            (xhr)=>{
                console.log((xhr.loaded/xhr.total)* 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
)
//objeto obeja 2
mtlLoader.load(
    'models/sheep.mtl', (material) => {
        material.preload()
        console.log(material)
        const objLoder = new OBJLoader()
        objLoder.setMaterials(material)
        objLoder.load(
            
            'models/sheep.obj', (object)=>{
                object.position.set(15,-0.25,-5)
                object.rotation.y=6
                object.traverse(function(child){
                    child.castShadow = true;
                    child.receiveShadow = true;
                });
                scene.add(object)
            },
            (xhr)=>{
                console.log((xhr.loaded/xhr.total)* 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
)
//objeto fogata
mtlLoader.load(
    'models/fogata.mtl', (material) => {
        material.preload()
        console.log(material)
        const objLoder = new OBJLoader()
        objLoder.setMaterials(material)
        objLoder.load(
            
            'models/fogata.obj', (object)=>{
                object.position.set(30,-0.3,5)
                object.rotation.y=1
                object.traverse(function(child){
                    child.castShadow = true;
                    child.receiveShadow = true;
                });
                scene.add(object)
            },
            (xhr)=>{
                console.log((xhr.loaded/xhr.total)* 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
)
//objeto pasto
mtlLoader.load(
    'models/grass.mtl', (material) => {
        material.preload()
        console.log(material)
        const objLoder = new OBJLoader()
        objLoder.setMaterials(material)
        objLoder.load(
            
            'models/grass.obj', (object)=>{
                object.position.set(20,-0.2,-5)
                object.rotation.y=1
                object.traverse(function(child){
                    child.castShadow = true;
                    child.receiveShadow = true;
                });
                scene.add(object)
            },
            (xhr)=>{
                console.log((xhr.loaded/xhr.total)* 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
)
//objeto caminoS
mtlLoader.load(
    'models/path.mtl', (material) => {
        material.preload()
        console.log(material)
        const objLoder = new OBJLoader()
        objLoder.setMaterials(material)
        objLoder.load(
            
            'models/path.obj', (object)=>{
                object.position.set(16.8,-0.11,14)
                object.rotation.y=1
                object.traverse(function(child){
                    child.castShadow = true;
                    child.receiveShadow = true;
                });
                scene.add(object)
            },
            (xhr)=>{
                console.log((xhr.loaded/xhr.total)* 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
)
//objeto poste
mtlLoader.load(
    'models/Pole.mtl', (material) => {
        material.preload()
        console.log(material)
        const objLoder = new OBJLoader()
        objLoder.setMaterials(material)
        objLoder.load(
            
            'models/Pole.obj', (object)=>{
                object.position.set(25,-0.11,20)
                object.rotation.y=4.5
                object.traverse(function(child){
                    child.castShadow = true;
                    child.receiveShadow = true;
                });
                scene.add(object)
            },
            (xhr)=>{
                console.log((xhr.loaded/xhr.total)* 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
)

function animate(){
    requestAnimationFrame(animate)
    controls.update()
    render()
    stats.update()
}
function render(){
    Composer.render()
}
animate()