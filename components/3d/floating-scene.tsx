'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    Float,
    MeshTransmissionMaterial,
    Environment,
    MeshDistortMaterial,
} from '@react-three/drei'
import * as THREE from 'three'

// ========================================
// FLOATING SHAPES SCENE
// ========================================

interface FloatingSceneProps {
    className?: string
}

export function FloatingScene({ className }: FloatingSceneProps) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <FloatingShapes />
                    <Environment preset="city" />
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 5, 5]} intensity={0.6} />
                    <pointLight position={[-5, -5, 5]} intensity={0.3} color="#0066FF" />
                </Suspense>
            </Canvas>
        </div>
    )
}

function FloatingShapes() {
    const groupRef = useRef<THREE.Group>(null)
    const { mouse } = useThree()

    // Parallax effect based on mouse
    useFrame(() => {
        if (!groupRef.current) return

        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            mouse.y * 0.2,
            0.05
        )
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            mouse.x * 0.3,
            0.05
        )
    })

    return (
        <group ref={groupRef}>
            {/* Main sphere */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={8}
                        resolution={256}
                        transmission={0.9}
                        roughness={0.1}
                        thickness={0.3}
                        ior={1.5}
                        chromaticAberration={0.02}
                        clearcoat={1}
                        attenuationColor="#0066FF"
                        color="#00D4AA"
                    />
                </mesh>
            </Float>

            {/* Floating cubes */}
            <Float speed={3} rotationIntensity={2} floatIntensity={1}>
                <mesh position={[-1.5, 0.8, -1]} rotation={[0.5, 0.5, 0]}>
                    <boxGeometry args={[0.4, 0.4, 0.4]} />
                    <meshStandardMaterial
                        color="#0066FF"
                        metalness={0.8}
                        roughness={0.2}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            </Float>

            <Float speed={2.5} rotationIntensity={1.5} floatIntensity={0.8}>
                <mesh position={[1.5, -0.5, -0.5]} rotation={[0.3, 0.8, 0.2]}>
                    <boxGeometry args={[0.3, 0.3, 0.3]} />
                    <meshStandardMaterial
                        color="#00D4AA"
                        metalness={0.8}
                        roughness={0.2}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            </Float>

            {/* Floating torus */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={0.6}>
                <mesh position={[1.2, 1, 0.5]} rotation={[0.5, 0, 0.5]}>
                    <torusGeometry args={[0.3, 0.1, 16, 32]} />
                    <meshStandardMaterial
                        color="#FF6B6B"
                        metalness={0.6}
                        roughness={0.3}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            </Float>

            {/* Small spheres */}
            <Float speed={4} rotationIntensity={0} floatIntensity={1.2}>
                <mesh position={[-1.2, -0.8, 0.3]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial
                        color="#FFD93D"
                        metalness={0.5}
                        roughness={0.3}
                    />
                </mesh>
            </Float>

            <Float speed={3.5} rotationIntensity={0} floatIntensity={1}>
                <mesh position={[0.5, 1.2, -0.8]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial
                        color="#6BCB77"
                        metalness={0.5}
                        roughness={0.3}
                    />
                </mesh>
            </Float>

            {/* Octahedron */}
            <Float speed={2} rotationIntensity={2} floatIntensity={0.5}>
                <mesh position={[-0.8, 0.5, 1]} rotation={[0, 0.5, 0.2]}>
                    <octahedronGeometry args={[0.25]} />
                    <meshStandardMaterial
                        color="#9B59B6"
                        metalness={0.7}
                        roughness={0.2}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            </Float>
        </group>
    )
}

// ========================================
// BLOB ANIMATION
// ========================================

interface AnimatedBlobProps {
    className?: string
    color?: string
}

export function AnimatedBlob({ className, color = '#0066FF' }: AnimatedBlobProps) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
                        <mesh>
                            <sphereGeometry args={[1.2, 64, 64]} />
                            <MeshDistortMaterial
                                color={color}
                                speed={3}
                                distort={0.4}
                                radius={1}
                                transparent
                                opacity={0.8}
                            />
                        </mesh>
                    </Float>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={0.8} />
                </Suspense>
            </Canvas>
        </div>
    )
}

// ========================================
// PARTICLES BACKGROUND
// ========================================

interface ParticlesBackgroundProps {
    className?: string
    count?: number
}

export function ParticlesBackground({ className, count = 100 }: ParticlesBackgroundProps) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <Particles count={count} />
                </Suspense>
            </Canvas>
        </div>
    )
}

function Particles({ count }: { count: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const { mouse } = useThree()

    // Generate random positions
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                ],
                scale: Math.random() * 0.5 + 0.1,
                speed: Math.random() * 0.5 + 0.2,
                offset: Math.random() * Math.PI * 2,
            })
        }
        return temp
    }, [count])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useFrame((state) => {
        if (!meshRef.current) return

        particles.forEach((particle, i) => {
            const t = state.clock.elapsedTime * particle.speed + particle.offset

            dummy.position.set(
                particle.position[0] + Math.sin(t) * 0.3 + mouse.x * 0.5,
                particle.position[1] + Math.cos(t) * 0.3 + mouse.y * 0.5,
                particle.position[2] + Math.sin(t * 0.5) * 0.2
            )
            dummy.scale.setScalar(particle.scale)
            dummy.updateMatrix()

            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })

        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#0066FF" transparent opacity={0.3} />
        </instancedMesh>
    )
}

// ========================================
// GRADIENT SPHERE (for hero background)
// ========================================

interface GradientSphereProps {
    className?: string
    scale?: number
}

export function GradientSphere({ className, scale = 1 }: GradientSphereProps) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 3], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
                        <mesh scale={scale}>
                            <sphereGeometry args={[1, 64, 64]} />
                            <GradientMaterial />
                        </mesh>
                    </Float>
                    <ambientLight intensity={0.5} />
                </Suspense>
            </Canvas>
        </div>
    )
}

function GradientMaterial() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    })

    return (
        <meshStandardMaterial
            color="#0066FF"
            metalness={0.1}
            roughness={0.8}
            transparent
            opacity={0.15}
        />
    )
}
