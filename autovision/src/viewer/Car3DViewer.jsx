import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Stage, useProgress, ContactShadows, Center } from "@react-three/drei";
import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import * as THREE from "three";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: '#00ffff', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#000' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Asset Sync Interrupted</h2>
            <p style={{ color: '#666' }}>The 3D showroom is reloading...</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function Model({ url, color, wheelColor, isExploded }) {
  const { scene } = useGLTF(url);
  const initialPositions = useRef(new Map());
  
  const model = useMemo(() => {
    const clone = scene.clone();
    
    // Calculate normalization
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    clone.scale.setScalar(scale);

    // Store initial positions of all meshes
    clone.traverse((child) => {
      if (child.isMesh) {
        initialPositions.current.set(child.uuid, child.position.clone());
      }
    });
    
    return clone;
  }, [scene]);

  useEffect(() => {
    model.traverse((child) => {
      if (child.isMesh) {
        const matName = child.material.name.toLowerCase();
        const meshName = child.name.toLowerCase();
        const originalPos = initialPositions.current.get(child.uuid);

        if (!originalPos) return;

        // Reset to original before applying logic
        child.position.copy(originalPos);

        const isPaint = matName.includes("paint") || matName.includes("body") || 
                        matName.includes("metal") || matName.includes("exterior") ||
                        matName === "material_0" || meshName.includes("body");

        const isWheel = matName.includes("wheel") || matName.includes("rim") || 
                        meshName.includes("rim") || meshName.includes("wheel");

        const isExcluded = matName.includes("glass") || matName.includes("tire") || matName.includes("plastic");

        if (isPaint && !isExcluded) child.material.color.set(color);
        if (isWheel && !matName.includes("tire")) child.material.color.set(wheelColor);

        // Exploded View - Absolute Offsets
        if (isExploded) {
          if (meshName.includes("wheel") || meshName.includes("tire")) {
            child.position.x += meshName.includes("left") ? -0.6 : 0.6;
          }
          if (meshName.includes("door") || meshName.includes("hood") || meshName.includes("trunk")) {
            child.position.y += 0.5;
          }
        }
      }
    });
  }, [model, color, wheelColor, isExploded]);

  return <primitive object={model} />;
}

export default function Car3DViewer({ 
  modelUrl, 
  accentColor = "#ffffff", 
  wheelColor = "#ffffff",
  isExploded = false,
  envType = "city",
  autoRotate = false
}) {
  if (!modelUrl) return null;

  return (
    <ErrorBoundary>
      <div style={{ width: "100%", height: "100vh", background: "#000" }}>
        <Canvas shadows camera={{ position: [3.5, 2, 3.5], fov: 40 }}>
          <Suspense fallback={<LoadingFallback />}>
            <Stage 
              environment={envType} 
              intensity={envType === "city" ? 0.5 : 0.2}
              contactShadow={false}
              adjustCamera={false}
            >
              <Center top>
                <Model 
                  url={modelUrl} 
                  color={accentColor} 
                  wheelColor={wheelColor}
                  isExploded={isExploded} 
                />
              </Center>
            </Stage>
            <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={12} blur={2} />
          </Suspense>

          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate={autoRotate}
            autoRotateSpeed={0.6}
            makeDefault
          />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}

function LoadingFallback() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        color: "#00ffff",
        background: "rgba(0,0,0,0.9)",
        padding: "20px 40px",
        borderRadius: "12px",
        border: "1px solid rgba(0,255,255,0.2)",
        textAlign: "center"
      }}>
        Loading Showroom...
        <br/>
        <span style={{ fontSize: "28px", fontWeight: "900" }}>{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}




