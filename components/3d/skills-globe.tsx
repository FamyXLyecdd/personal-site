'use client'

import { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    Text,
    OrbitControls,
    Html,
    Float,
} from '@react-three/drei'
import * as THREE from 'three'

const ThreeLine = 'line' as any

// ========================================
// SKILLS GLOBE / NETWORK VISUALIZATION
// ========================================

interface Skill {
    name: string
    level: number // 0-100
    color: string
}

const defaultSkills: Skill[] = [
    { name: 'Python', level: 95, color: '#3776AB' },
    { name: 'Discord.py', level: 90, color: '#5865F2' },
    { name: 'JavaScript', level: 85, color: '#F7DF1E' },
    { name: 'TypeScript', level: 80, color: '#3178C6' },
    { name: 'React', level: 75, color: '#61DAFB' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'AI/ML', level: 70, color: '#FF6B6B' },
    { name: 'Web Scraping', level: 85, color: '#00D4AA' },
    { name: 'Automation', level: 90, color: '#9B59B6' },
    { name: 'APIs', level: 88, color: '#FF9500' },
    { name: 'SQL', level: 75, color: '#336791' },
    { name: 'Git', level: 85, color: '#F05032' },
]

interface SkillsGlobeProps {
    className?: string
    skills?: Skill[]
    autoRotate?: boolean
}

export function SkillsGlobe({
    className,
    skills = defaultSkills,
    autoRotate = true,
}: SkillsGlobeProps) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <SkillsNetwork skills={skills} autoRotate={autoRotate} />
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={0.5} />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0066FF" />
                </Suspense>
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={autoRotate}
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI - Math.PI / 4}
                />
            </Canvas>
        </div>
    )
}

interface SkillNode {
    skill: Skill
    position: THREE.Vector3
    connections: number[]
}

function SkillsNetwork({ skills, autoRotate }: { skills: Skill[]; autoRotate: boolean }) {
    const groupRef = useRef<THREE.Group>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    // Position nodes in a sphere
    const nodes = useMemo<SkillNode[]>(() => {
        const radius = 3
        return skills.map((skill, i) => {
            // Fibonacci sphere distribution
            const phi = Math.acos(1 - 2 * (i + 0.5) / skills.length)
            const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)

            const x = radius * Math.sin(phi) * Math.cos(theta)
            const y = radius * Math.sin(phi) * Math.sin(theta)
            const z = radius * Math.cos(phi)

            // Connect to nearby nodes
            const connections: number[] = []
            for (let j = 0; j < skills.length; j++) {
                if (i !== j && Math.random() > 0.6) {
                    connections.push(j)
                }
            }

            return {
                skill,
                position: new THREE.Vector3(x, y, z),
                connections: connections.slice(0, 3), // Max 3 connections
            }
        })
    }, [skills])

    // Generate connection lines
    const lines = useMemo(() => {
        const lineGeometries: { start: THREE.Vector3; end: THREE.Vector3 }[] = []

        nodes.forEach((node, i) => {
            node.connections.forEach(j => {
                if (j > i) { // Avoid duplicates
                    lineGeometries.push({
                        start: node.position,
                        end: nodes[j].position,
                    })
                }
            })
        })

        return lineGeometries
    }, [nodes])

    useFrame((state) => {
        if (!groupRef.current || autoRotate) return

        // Subtle idle animation
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    })

    return (
        <group ref={groupRef}>
            {/* Connection lines */}
            {lines.map((line, i) => (
                <ConnectionLine
                    key={`line-${i}`}
                    start={line.start}
                    end={line.end}
                    highlighted={hoveredIndex !== null}
                />
            ))}

            {/* Skill nodes */}
            {nodes.map((node, i) => (
                <SkillNodeMesh
                    key={`node-${i}`}
                    node={node}
                    index={i}
                    isHovered={hoveredIndex === i}
                    onHover={() => setHoveredIndex(i)}
                    onUnhover={() => setHoveredIndex(null)}
                />
            ))}

            {/* Center sphere */}
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial
                    color="#0066FF"
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.5}
                />
            </mesh>
        </group>
    )
}

function SkillNodeMesh({
    node,
    index,
    isHovered,
    onHover,
    onUnhover,
}: {
    node: SkillNode
    index: number
    isHovered: boolean
    onHover: () => void
    onUnhover: () => void
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const scale = (node.skill.level / 100) * 0.3 + 0.15

    useFrame((state) => {
        if (!meshRef.current) return

        // Pulse animation
        const pulse = Math.sin(state.clock.elapsedTime * 2 + index) * 0.05
        meshRef.current.scale.setScalar(scale + pulse + (isHovered ? 0.1 : 0))
    })

    return (
        <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
            <group position={node.position}>
                <mesh
                    ref={meshRef}
                    onPointerOver={onHover}
                    onPointerOut={onUnhover}
                >
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshStandardMaterial
                        color={node.skill.color}
                        metalness={0.5}
                        roughness={0.3}
                        emissive={node.skill.color}
                        emissiveIntensity={isHovered ? 0.5 : 0.1}
                    />
                </mesh>

                {/* Skill label */}
                {isHovered && (
                    <Html
                        position={[0, scale + 0.5, 0]}
                        center
                        style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#1a1a1a',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            border: '1px solid rgba(0,0,0,0.08)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                    >
                        {node.skill.name} • {node.skill.level}%
                    </Html>
                )}
            </group>
        </Float>
    )
}

function ConnectionLine({
    start,
    end,
    highlighted,
}: {
    start: THREE.Vector3
    end: THREE.Vector3
    highlighted: boolean
}) {
    const lineRef = useRef<THREE.Line>(null)

    const geometry = useMemo(() => {
        const points = [start, end]
        return new THREE.BufferGeometry().setFromPoints(points)
    }, [start, end])

    useFrame((state) => {
        if (!lineRef.current) return

        // Animate line opacity
        const material = lineRef.current.material as THREE.LineBasicMaterial
        material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    })

    return (
        <ThreeLine ref={lineRef} geometry={geometry}>
            <lineBasicMaterial
                color="#0066FF"
                transparent
                opacity={highlighted ? 0.1 : 0.2}
                linewidth={1}
            />
        </ThreeLine>
    )
}

// ========================================
// SIMPLER SKILLS RADAR (2D but in 3D space)
// ========================================

interface SkillsRadarProps {
    className?: string
    skills?: Skill[]
}

export function SkillsRadar({ className, skills = defaultSkills.slice(0, 6) }: SkillsRadarProps) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <RadarChart skills={skills} />
                    <ambientLight intensity={0.8} />
                </Suspense>
            </Canvas>
        </div>
    )
}

function RadarChart({ skills }: { skills: Skill[] }) {
    const groupRef = useRef<THREE.Group>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const angleStep = (Math.PI * 2) / skills.length
    const maxRadius = 1.5

    useFrame((state) => {
        if (!groupRef.current) return
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    })

    // Create radar shape points
    const radarPoints = useMemo(() => {
        return skills.map((skill, i) => {
            const angle = i * angleStep - Math.PI / 2
            const radius = (skill.level / 100) * maxRadius
            return new THREE.Vector3(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0
            )
        })
    }, [skills, angleStep, maxRadius])

    // Create filled shape
    const radarShape = useMemo(() => {
        const shape = new THREE.Shape()
        radarPoints.forEach((point, i) => {
            if (i === 0) {
                shape.moveTo(point.x, point.y)
            } else {
                shape.lineTo(point.x, point.y)
            }
        })
        shape.closePath()
        return shape
    }, [radarPoints])

    return (
        <group ref={groupRef}>
            {/* Grid circles */}
            {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                <mesh key={`grid-${i}`} rotation={[0, 0, 0]}>
                    <ringGeometry args={[maxRadius * scale - 0.01, maxRadius * scale, 64]} />
                    <meshBasicMaterial color="#000000" transparent opacity={0.05} side={THREE.DoubleSide} />
                </mesh>
            ))}

            {/* Grid lines */}
            {skills.map((_, i) => {
                const angle = i * angleStep - Math.PI / 2
                const points = [
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(Math.cos(angle) * maxRadius, Math.sin(angle) * maxRadius, 0)
                ]
                return (
                    <ThreeLine key={`line-${i}`}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                                count={2}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color="#000000" transparent opacity={0.1} />
                    </ThreeLine>
                )
            })}

            {/* Filled radar area */}
            <mesh>
                <shapeGeometry args={[radarShape]} />
                <meshBasicMaterial
                    color="#0066FF"
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Radar outline */}
            <ThreeLine>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={new Float32Array([...radarPoints, radarPoints[0]].flatMap(p => [p.x, p.y, p.z]))}
                        count={radarPoints.length + 1}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#0066FF" linewidth={2} />
            </ThreeLine>

            {/* Skill points */}
            {radarPoints.map((point, i) => (
                <Float key={`point-${i}`} speed={3} floatIntensity={0.1}>
                    <mesh
                        position={point}
                        onPointerOver={() => setHoveredIndex(i)}
                        onPointerOut={() => setHoveredIndex(null)}
                    >
                        <sphereGeometry args={[hoveredIndex === i ? 0.08 : 0.05, 16, 16]} />
                        <meshBasicMaterial color={skills[i].color} />
                    </mesh>
                </Float>
            ))}

            {/* Skill labels */}
            {skills.map((skill, i) => {
                const angle = i * angleStep - Math.PI / 2
                const labelRadius = maxRadius + 0.3
                return (
                    <Html
                        key={`label-${i}`}
                        position={[
                            Math.cos(angle) * labelRadius,
                            Math.sin(angle) * labelRadius,
                            0
                        ]}
                        center
                        style={{
                            fontSize: '11px',
                            fontWeight: hoveredIndex === i ? 600 : 500,
                            color: hoveredIndex === i ? '#0066FF' : '#666666',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s',
                            pointerEvents: 'none',
                        }}
                    >
                        {skill.name}
                    </Html>
                )
            })}
        </group>
    )
}
