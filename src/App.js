import * as THREE from "three"
import { useRef, useReducer, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from "@react-three/drei"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import { BallCollider, Physics, RigidBody, CylinderCollider, CuboidCollider } from "@react-three/rapier"
import { easing } from "maath"

THREE.ColorManagement.legacyMode = false
const baubleMaterial = new THREE.MeshLambertMaterial({ color: "white", emissive: "orange" })
const capMaterial = new THREE.MeshStandardMaterial({ metalness: 0.75, roughness: 0.15, color: "#8a492f", emissive: "#600000", envMapIntensity: 20 })
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)
const baubles = [...Array(50)].map(() => ({ scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)] }))

function Bauble({ vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread }) {
  const { nodes } = useGLTF("/cap.glb")
  const api = useRef()
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiply({ x: -50 * delta * scale, y: -150 * delta * scale, z: -50 * delta * scale }),
    )
  })
  return (
    <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2} position={[r(20), r(20) - 25, r(20) - 10]} ref={api} colliders={false} dispose={null}>
      <BallCollider args={[scale]} />
      <CylinderCollider rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.2 * scale]} args={[0.15 * scale, 0.275 * scale]} />
      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry} material={baubleMaterial} />
      <mesh castShadow scale={2.5 * scale} position={[0, 0, -1.8 * scale]} geometry={nodes.Mesh_1.geometry} material={capMaterial} />
    </RigidBody>
  )
}

// function Pointer({ vec = new THREE.Vector3() }) {
//   const ref = useRef()
//   useFrame(({ mouse, viewport }) => {
//     vec.lerp({ x: (mouse.x * viewport.width) / 2, y: (mouse.y * viewport.height) / 2, z: 0 }, 0.2)
//     ref.current?.setNextKinematicTranslation(vec)
//   })
//   return (
//     <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
//       <BallCollider args={[2]} />
//     </RigidBody>
//   )
// }

export const App = () => (
  <Scene style={{ borderRadius: 20 }} />
  // <Canvas
  //   shadows
  //   gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
  //   camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
  //   onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}>
  //   <ambientLight intensity={1} />
  //   <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[512, 512]} />
  //   <directionalLight position={[0, 5, -4]} intensity={4} />
  //   <directionalLight position={[0, -15, -0]} intensity={4} color="red" />
  //   <Physics gravity={[0, 0, 0]}>
  //     <Pointer />
  //     {baubles.map((props, i) => <Bauble key={i} {...props} />) /* prettier-ignore */}
  //   </Physics>
  //   <Environment files="/adamsbridge.hdr" />
  //   <EffectComposer disableNormalPass>
  //     <N8AO color="red" aoRadius={2} intensity={1.15} />
  //   </EffectComposer>
  // </Canvas>
)

// https://twitter.com/lusionltd/status/1701534187545636964
// https://lusion.co

const orangeAccents = ["#ff1b1c", "#b8d14b", "#ff9e00"]
const purpleAccents = ["#785589", "#9d4edd", "#893168"]
const darkAccents = ["#221e22", "#212d40", "#31263e"]
const shuffle = (accent = 0) => [
  { color: orangeAccents[accent], roughness: 0.1, accent: true },
  { color: orangeAccents[accent], roughness: 0.1, accent: true },
  { color: orangeAccents[accent], roughness: 0.1, accent: true },
  { color: purpleAccents[accent], roughness: 0.1 },
  { color: purpleAccents[accent], roughness: 0 },
  { color: purpleAccents[accent], roughness: 0.1 },
  { color: darkAccents[accent], roughness: 0.1, accent: true },
  { color: darkAccents[accent], roughness: 0.1, accent: true },
  { color: darkAccents[accent], roughness: 0.1, accent: true },
]
function Scene(props) {
  const [accent, click] = useReducer((state) => ++state % darkAccents.length, 0)
  const connectors = useMemo(() => shuffle(accent), [accent])
  return (
    <Canvas onClick={click} shadows dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }} {...props}>
      <ambientLight intensity={4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow />
      <Physics /*debug*/ gravity={[4, 0, 1]}>
        <Pointer />
        {connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */}
        <Connector position={[10, 10, 5]}>
          <Model>
            <MeshTransmissionMaterial clearcoat={1} thickness={0.1} anisotropicBlur={0.1} chromaticAberration={0.1} samples={8} resolution={512} />
          </Model>
        </Connector>
      </Physics>
      <EffectComposer disableNormalPass multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        </group>
      </Environment>
    </Canvas>
  )
}

function Connector({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {
  const api = useRef()
  const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
  })
  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? children : <Model {...props} />}
      {accent && <pointLight intensity={4} distance={2.5} color={props.color} />}
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  )
}

function Model({ children, color = "white", roughness = 0, ...props }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF("/c-transformed.glb")
  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta)
  })
  return (
    <mesh ref={ref} castShadow receiveShadow scale={10} geometry={nodes.connector.geometry}>
      <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.base.map} />
      {children}
    </mesh>
  )
}
