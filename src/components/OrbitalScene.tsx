import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Scene() {
  const meshRef = useRef<any>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.18
      meshRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 4, 6]} intensity={1.8} color="#f59e0b" />
      <pointLight position={[-4, -2, -4]} intensity={1.5} color="#ea580c" />
      <Float speed={2.8} rotationIntensity={0.35} floatIntensity={1.1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.35, 4]} />
          <MeshDistortMaterial
            color="#1c1917"
            emissive="#b45309"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
      </Float>
      <Stars radius={70} depth={50} count={900} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

export default function OrbitalScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="h-full w-full">
      <Scene />
    </Canvas>
  )
}
