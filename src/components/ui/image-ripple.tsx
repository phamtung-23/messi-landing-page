"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { OrthographicCamera, useFBO, useTexture } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// Error boundary component for WebGL failures
function WebGLErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault()
      console.warn('WebGL context lost. Attempting to restore...')
      setHasError(true)
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored.')
      setHasError(false)
    }

    // Add global WebGL context loss handlers
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost)
      canvas.addEventListener('webglcontextrestored', handleContextRestored)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      }
    }
  }, [])

  if (hasError) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Graphics Issue Detected</h2>
          <p className="text-gray-600 mb-4">The 3D experience is temporarily unavailable.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default function Scene() {
  const device = useDimension()

  if (!device.width || !device.height) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  const frustumSize = device.height
  const aspect = device.width / device.height

  return (
    <WebGLErrorBoundary>
      <div className="relative flex h-screen w-full items-center justify-center">
        <Canvas
          gl={{
            preserveDrawingBuffer: false,
            powerPreference: "high-performance",
            antialias: false,
            depth: false,
            stencil: false,
            alpha: true,
          }}
          onCreated={({ gl }) => {
            // Add context loss handlers to the renderer
            const canvas = gl.domElement
            
            const handleContextLost = (event: Event) => {
              event.preventDefault()
              console.warn('WebGL context lost on canvas')
            }

            const handleContextRestored = () => {
              console.log('WebGL context restored on canvas')
            }

            canvas.addEventListener('webglcontextlost', handleContextLost)
            canvas.addEventListener('webglcontextrestored', handleContextRestored)
          }}
        >
          <OrthographicCamera
            makeDefault
            args={[
              (frustumSize * aspect) / -2,
              (frustumSize * aspect) / 2,
              frustumSize / 2,
              frustumSize / -2,
              -1000,
              1000,
            ]}
            position={[0, 0, 2]}
          />
          <Model />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  )
}

function Model() {
  const { viewport, gl, camera } = useThree()
  const texture = useTexture("/brush.png")
  // Load image textures at the top level
  const messiTexture1 = useTexture("/images/messi-football.jpeg")
  const messiTexture2 = useTexture("/images/messi-football.jpeg")
  
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])
  const [meshes, setMeshes] = useState<React.JSX.Element[]>([])
  const mouse = useMouse()
  const device = useDimension()
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 })
  const [currentWave, setCurrentWave] = useState(0)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const isDisposed = useRef(false)

  const max = 100

  const uniforms = useRef({
    uDisplacement: { value: new THREE.Texture() },
    uTexture: { value: new THREE.Texture() },
    winResolution: {
      value: new THREE.Vector2(0, 0),
    },
  })

  // Create FBOs with error handling
  const fboBase = useFBO(device.width, device.height, {
    samples: 0,
    type: THREE.UnsignedByteType,
    format: THREE.RGBAFormat,
  })
  const fboTexture = useFBO(device.width, device.height, {
    samples: 0,
    type: THREE.UnsignedByteType,
    format: THREE.RGBAFormat,
  })

  // Memoize image scene creation
  const { scene: imageScene, camera: imageCamera } = React.useMemo(() => {
    return Images(
      new THREE.Vector2(viewport.width, viewport.height),
      messiTexture1,
      messiTexture2
    )
  }, [viewport.width, viewport.height, messiTexture1, messiTexture2])

  // Initialize scene
  useEffect(() => {
    if (!sceneRef.current) {
      sceneRef.current = new THREE.Scene()
    }
  }, [])

  useEffect(() => {
    const generatedMeshes = Array.from({ length: max }).map((_, i) => (
      <mesh
        key={i}
        position={[0, 0, 0]}
        ref={(el) => {
          if (!isDisposed.current) {
            meshRefs.current[i] = el
          }
        }}
        rotation={[0, 0, Math.random()]}
        visible={false}
      >
        <planeGeometry args={[60, 60, 1, 1]} />
        <meshBasicMaterial transparent={true} map={texture} />
      </mesh>
    ))
    setMeshes(generatedMeshes)
  }, [texture])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isDisposed.current = true
      
      // Dispose meshes
      meshRefs.current.forEach((mesh) => {
        if (mesh) {
          mesh.geometry?.dispose()
          if (mesh.material instanceof THREE.Material) {
            mesh.material.dispose()
          }
        }
      })
      
      // Dispose uniforms textures
      if (uniforms.current.uDisplacement.value instanceof THREE.Texture) {
        uniforms.current.uDisplacement.value.dispose()
      }
      if (uniforms.current.uTexture.value instanceof THREE.Texture) {
        uniforms.current.uTexture.value.dispose()
      }
      
      // Dispose FBOs
      try {
        fboBase?.dispose()
        fboTexture?.dispose()
      } catch (error) {
        console.warn('Error disposing FBOs:', error)
      }
      
      // Clear scene
      if (sceneRef.current) {
        // Remove all objects from scene
        while (sceneRef.current.children.length > 0) {
          const child = sceneRef.current.children[0]
          sceneRef.current.remove(child)
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose()
            if (child.material instanceof THREE.Material) {
              child.material.dispose()
            }
          }
        }
      }
    }
  }, [])

  const setNewWave = useCallback((x: number, y: number, currentWave: number) => {
    if (isDisposed.current) return
    
    const mesh = meshRefs.current[currentWave]
    if (mesh) {
      mesh.position.x = x
      mesh.position.y = y
      mesh.visible = true
      ;(mesh.material as THREE.Material).opacity = 1
      mesh.scale.x = 1.75
      mesh.scale.y = 1.75
    }
  }, [])

  const trackMousePos = useCallback((x: number, y: number) => {
    if (isDisposed.current) return
    
    if (Math.abs(x - prevMouse.x) > 0.1 || Math.abs(y - prevMouse.y) > 0.1) {
      setCurrentWave((currentWave + 1) % max)
      setNewWave(x, y, currentWave)
    }
    setPrevMouse({ x: x, y: y })
  }, [prevMouse.x, prevMouse.y, currentWave, setNewWave, max])

  useFrame(({ gl, scene: finalScene }) => {
    if (isDisposed.current || !sceneRef.current) return

    try {
      const x = mouse.x - device.width / 1.65
      const y = -mouse.y + device.height / 1.5
      trackMousePos(x, y)
      
      meshRefs.current.forEach((mesh) => {
        if (mesh && mesh.visible && !isDisposed.current) {
          mesh.rotation.z += 0.025
          ;(mesh.material as THREE.MeshBasicMaterial).opacity *= 0.95
          mesh.scale.x = 0.98 * mesh.scale.x + 0.155
          mesh.scale.y = 0.98 * mesh.scale.y + 0.155
        }
      })

      if (device.width > 0 && device.height > 0 && !isDisposed.current) {
        // Render to base texture with meshes
        gl.setRenderTarget(fboBase)
        gl.clear()
        meshRefs.current.forEach((mesh) => {
          if (mesh && mesh.visible && sceneRef.current) {
            sceneRef.current.add(mesh)
          }
        })
        gl.render(sceneRef.current, camera)
        meshRefs.current.forEach((mesh) => {
          if (mesh && mesh.visible && sceneRef.current) {
            sceneRef.current.remove(mesh)
          }
        })
        uniforms.current.uTexture.value = fboTexture.texture

        gl.setRenderTarget(fboTexture)
        gl.render(imageScene, imageCamera)
        uniforms.current.uDisplacement.value = fboBase.texture

        gl.setRenderTarget(null)
        gl.render(finalScene, camera)

        uniforms.current.winResolution.value = new THREE.Vector2(
          device.width,
          device.height
        ).multiplyScalar(device.pixelRatio)
      }
    } catch (error) {
      console.error('Render error:', error)
      // Don't throw, just log and continue
    }
  }, 1)

  function Images(viewport: THREE.Vector2, texture1: THREE.Texture, texture2: THREE.Texture) {
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(
      viewport.width / -2,
      viewport.width / 2,
      viewport.height / 2,
      viewport.height / -2,
      -1000,
      1000
    )
    camera.position.z = 2
    scene.add(camera)
    const geometry = new THREE.PlaneGeometry(1, 1)
    const group = new THREE.Group()

    try {
      const material1 = new THREE.MeshBasicMaterial({ map: texture1 })
      const image1 = new THREE.Mesh(geometry, material1)
      image1.position.x = -0.3 * viewport.width
      image1.position.y = 0
      image1.position.z = 1
      image1.scale.x = 1080 / 4
      image1.scale.y = 1920 / 4
      group.add(image1)

      const material2 = new THREE.MeshBasicMaterial({ map: texture2 })
      const image2 = new THREE.Mesh(geometry, material2)
      image2.position.x = -0.001 * viewport.width
      image2.position.y = 0
      image2.position.z = 1
      image2.scale.x = 1080 / 4
      image2.scale.y = 1920 / 4
      group.add(image2)
    } catch (error) {
      console.error('Error creating image meshes:', error)
    }

    scene.add(group)
    return { scene, camera }
  }

  return (
    <group>
      {meshes}
      <mesh>
        <planeGeometry args={[device.width, device.height, 1, 1]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent={true}
          uniforms={uniforms.current}
        />
      </mesh>
    </group>
  )
}

function useMouse() {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0, pixelRatio: 0 })

  const mouseMove = useCallback((e: { clientX: number; clientY: number }) => {
    const { clientX, clientY } = e
    setMouse({
      x: clientX,
      y: clientY,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    })
  }, [])

  React.useEffect(() => {
    window.addEventListener("mousemove", mouseMove)
    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [mouseMove])

  return mouse
}

function useDimension() {
  const [dimension, setDimension] = React.useState({
    width: 0,
    height: 0,
    pixelRatio: 1,
  })

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const resize = () => {
        setDimension({
          width: window.innerWidth,
          height: window.innerHeight,
          pixelRatio: Math.min(window.devicePixelRatio, 2), // Cap pixel ratio
        })
      }

      resize()

      window.addEventListener("resize", resize)

      return () => window.removeEventListener("resize", resize)
    }
  }, [])

  return dimension
}

const fragment = `
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec4 winResolution;
varying vec2 vUv;
float PI = 3.141592653589793238;

void main() {
  vec2 vUvScreen = gl_FragCoord.xy / winResolution.xy;

  vec4 displacement = texture2D(uDisplacement, vUvScreen);
  float theta = displacement.r*2.0*PI;

  vec2 dir = vec2(sin(theta),cos(theta));
  vec2 uv = vUvScreen + dir*displacement.r*0.075;
  vec4 color = texture2D(uTexture,uv);

  gl_FragColor = color;
}
`

const vertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
