'use client'

import { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    MeshTransmissionMaterial,
    Environment,
    Float,
    Sphere,
    useTexture,
} from '@react-three/drei'
import { Physics, RigidBody, useSphericalJoint, RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'

// ========================================
// RUBBER BALL WITH SPRING PHYSICS
// ========================================

interface RubberBallSceneProps {
    className?: string
}

export function RubberBallScene({ className }: RubberBallSceneProps) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <Physics gravity={[0, -9.81, 0]} timeStep={1 / 120}>
                        <RubberBallWithSpring />
                    </Physics>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00D4AA" />
                </Suspense>
            </Canvas>
        </div>
    )
}

function RubberBallWithSpring() {
    const anchorRef = useRef<RapierRigidBody>(null)
    const ballRef = useRef<RapierRigidBody>(null)
    const meshRef = useRef<THREE.Mesh>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [hovered, setHovered] = useState(false)
    const { viewport, mouse, camera, gl } = useThree()

    // Spring joint between anchor and ball
    useSphericalJoint(anchorRef, ballRef, [
        [0, 0, 0],
        [0, 2, 0],
    ])

    // Handle mouse/touch interaction
    const handlePointerDown = useCallback(() => {
        setIsDragging(true)
        document.body.style.cursor = 'grabbing'
    }, [])

    const handlePointerUp = useCallback(() => {
        setIsDragging(false)
        document.body.style.cursor = hovered ? 'grab' : 'auto'
    }, [hovered])

    // Global pointer up event
    useEffect(() => {
        const handleGlobalUp = () => {
            if (isDragging) {
                setIsDragging(false)
                document.body.style.cursor = 'auto'
            }
        }

        window.addEventListener('pointerup', handleGlobalUp)
        window.addEventListener('pointercancel', handleGlobalUp)

        return () => {
            window.removeEventListener('pointerup', handleGlobalUp)
            window.removeEventListener('pointercancel', handleGlobalUp)
        }
    }, [isDragging])

    // Animation loop
    useFrame(() => {
        if (!ballRef.current || !meshRef.current) return

        if (isDragging) {
            // Convert mouse position to 3D world coordinates
            const vec = new THREE.Vector3(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2, 0)

            // Apply force toward mouse position
            const ballPos = ballRef.current.translation()
            const force = new THREE.Vector3(
                (vec.x - ballPos.x) * 50,
                (vec.y - ballPos.y) * 50,
                0
            )

            ballRef.current.applyImpulse(force, true)
        }

        // Update mesh to match physics body
        const translation = ballRef.current.translation()
        meshRef.current.position.set(translation.x, translation.y, translation.z)

        // Rotation based on velocity
        const velocity = ballRef.current.linvel()
        meshRef.current.rotation.x += velocity.y * 0.01
        meshRef.current.rotation.z -= velocity.x * 0.01
    })

    return (
        <>
            {/* Invisible anchor point */}
            <RigidBody ref={anchorRef} type="fixed" position={[0, 3, 0]}>
                <mesh visible={false}>
                    <sphereGeometry args={[0.1]} />
                </mesh>
            </RigidBody>

            {/* Spring line */}
            <SpringLine anchorRef={anchorRef} ballRef={ballRef} />

            {/* Rubber ball with physics */}
            <RigidBody
                ref={ballRef}
                colliders="ball"
                restitution={0.8}
                friction={0.3}
                linearDamping={0.5}
                angularDamping={0.5}
                position={[0, 0, 0]}
            >
                <mesh visible={false}>
                    <sphereGeometry args={[1]} />
                </mesh>
            </RigidBody>

            {/* Visual ball (follows physics body) */}
            <Float
                speed={isDragging ? 0 : 2}
                rotationIntensity={isDragging ? 0 : 0.5}
                floatIntensity={isDragging ? 0 : 0.5}
            >
                <mesh
                    ref={meshRef}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerOver={() => {
                        setHovered(true)
                        document.body.style.cursor = 'grab'
                    }}
                    onPointerOut={() => {
                        setHovered(false)
                        if (!isDragging) document.body.style.cursor = 'auto'
                    }}
                    scale={hovered && !isDragging ? 1.1 : 1}
                >
                    <sphereGeometry args={[1, 64, 64]} />
                    <GradientMaterial />
                </mesh>
            </Float>

            {/* Glow effect */}
            <mesh position={[0, 0, -0.5]} scale={2}>
                <circleGeometry args={[1, 32]} />
                <meshBasicMaterial color="#0066FF" transparent opacity={0.1} />
            </mesh>
        </>
    )
}

// Gradient material for the ball
function GradientMaterial() {
    return (
        <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.9}
            roughness={0.1}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.2}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#0066FF"
            color="#00D4AA"
        />
    )
}

// Spring line connecting anchor to ball
function SpringLine({
    anchorRef,
    ballRef
}: {
    anchorRef: React.RefObject<RapierRigidBody>
    ballRef: React.RefObject<RapierRigidBody>
}) {
    const lineRef = useRef<THREE.Line>(null)
    const pointsRef = useRef<THREE.BufferAttribute | null>(null)

    useFrame(() => {
        if (!anchorRef.current || !ballRef.current || !lineRef.current) return

        const anchorPos = anchorRef.current.translation()
        const ballPos = ballRef.current.translation()

        // Create curved spring line
        const midY = (anchorPos.y + ballPos.y) / 2
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(anchorPos.x, anchorPos.y, anchorPos.z),
            new THREE.Vector3((anchorPos.x + ballPos.x) / 2, midY + 0.5, 0),
            new THREE.Vector3(ballPos.x, ballPos.y + 1, ballPos.z)
        )

        const points = curve.getPoints(20)
        const positions = new Float32Array(points.length * 3)

        points.forEach((point, i) => {
            positions[i * 3] = point.x
            positions[i * 3 + 1] = point.y
            positions[i * 3 + 2] = point.z
        })

        lineRef.current.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        )
    })

    return (
        <line ref={lineRef as any}>
            <bufferGeometry />
            <lineBasicMaterial color="#0066FF" opacity={0.3} transparent linewidth={2} />
        </line>
    )
}

// ========================================
// SIMPLIFIED RUBBER BALL (without Rapier for fallback)
// ========================================

export function SimpleRubberBall({ className }: { className?: string }) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <InteractiveBall />
                    <Environment preset="city" />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} intensity={0.8} />
                </Suspense>
            </Canvas>
        </div>
    )
}

function InteractiveBall() {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)
    const [dragging, setDragging] = useState(false)
    const { mouse, viewport } = useThree()

    // Target position for smooth following
    const targetPos = useRef(new THREE.Vector3(0, 0, 0))
    const velocity = useRef(new THREE.Vector3(0, 0, 0))

    useFrame((_, delta) => {
        if (!meshRef.current) return

        if (dragging) {
            // Follow mouse
            targetPos.current.set(
                mouse.x * viewport.width / 3,
                mouse.y * viewport.height / 3,
                0
            )
        } else {
            // Return to center with spring physics
            targetPos.current.set(0, 0, 0)
        }

        // Spring physics
        const springStrength = dragging ? 8 : 4
        const damping = 0.85

        const dx = targetPos.current.x - meshRef.current.position.x
        const dy = targetPos.current.y - meshRef.current.position.y

        velocity.current.x += dx * springStrength * delta
        velocity.current.y += dy * springStrength * delta
        velocity.current.x *= damping
        velocity.current.y *= damping

        meshRef.current.position.x += velocity.current.x
        meshRef.current.position.y += velocity.current.y

        // Rotation based on velocity
        meshRef.current.rotation.x += velocity.current.y * 0.05
        meshRef.current.rotation.z -= velocity.current.x * 0.05

        // Scale animation
        const targetScale = hovered ? 1.15 : 1
        meshRef.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.1
        )
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                onPointerDown={() => {
                    setDragging(true)
                    document.body.style.cursor = 'grabbing'
                }}
                onPointerUp={() => {
                    setDragging(false)
                    document.body.style.cursor = hovered ? 'grab' : 'auto'
                }}
                onPointerOver={() => {
                    setHovered(true)
                    document.body.style.cursor = 'grab'
                }}
                onPointerOut={() => {
                    setHovered(false)
                    if (!dragging) document.body.style.cursor = 'auto'
                }}
            >
                <sphereGeometry args={[1, 64, 64]} />
                <MeshTransmissionMaterial
                    backside
                    samples={8}
                    resolution={256}
                    transmission={0.95}
                    roughness={0.05}
                    thickness={0.3}
                    ior={1.5}
                    chromaticAberration={0.03}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor="#0066FF"
                    color="#00D4AA"
                />
            </mesh>
        </Float>
    )
}
