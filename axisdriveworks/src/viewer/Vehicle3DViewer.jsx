import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Stage, useProgress, ContactShadows, Center } from "@react-three/drei";
import React, { Suspense, useEffect, useState, useMemo, useRef } from "react";
import * as THREE from "three";
import { MODEL_MANIFEST, smartMatchMaterial } from "./modelConfig";

// Use a high-performance CDN for the Draco decoder
const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>ENGINE STALL</h2>
            <p style={{ color: '#666' }}>The 3D showroom is reloading assets...</p>
            <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', background: '#00ffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>RESTART ENGINE</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function Model({ url, color, wheelColor, isExploded }) {
  // Enable Draco decoding for compressed GLB files
  const { scene } = useGLTF(url, DRACO_URL);
  const initialPositions = useRef(new Map());
  
  // Find manifest entry based on URL or Filename
  const modelKey = useMemo(() => {
    return Object.keys(MODEL_MANIFEST).find(key => url.includes(key)) || null;
  }, [url]);

  const model = useMemo(() => {
    const clone = scene.clone();
    
    // Scale Normalization Logic
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = (MODEL_MANIFEST[modelKey]?.scale || 2.2) / maxDim;
    clone.scale.setScalar(scale);

    // Store initial positions for Exploded View
    clone.traverse((child) => {
      if (child.isMesh) {
        initialPositions.current.set(child.uuid, child.position.clone());
      }
    });
    
    return clone;
  }, [scene, modelKey]);

  useEffect(() => {
    const config = MODEL_MANIFEST[modelKey];

    model.traverse((child) => {
      if (child.isMesh) {
        const matName = child.material.name.toLowerCase();
        const meshName = child.name.toLowerCase();
        const originalPos = initialPositions.current.get(child.uuid);

        if (!originalPos) return;
        child.position.copy(originalPos);

        // Determine if part should be colored using Manifest (Primary) or Smart Match (Fallback)
        let isPaint = config?.paintParts?.includes(child.name);
        let isWheel = config?.wheelParts?.includes(child.name);
        let isGlass = config?.exclusionParts?.includes(child.name);

        if (isPaint === undefined) {
          const matched = smartMatchMaterial(child.name, child.material.name);
          isPaint = matched.isPaint;
          isWheel = matched.isWheel;
          isGlass = matched.isGlass;
        }

        // Apply Colors
        if (isPaint && !isGlass) {
          child.material = child.material.clone(); // Ensure unique material instance
          child.material.color.set(color);
          child.material.roughness = 0.2;
          child.material.metalness = 0.8;
        }
        
        if (isWheel && !isGlass) {
          child.material = child.material.clone();
          child.material.color.set(wheelColor);
        }

        // Exploded View Logic
        if (isExploded) {
          if (meshName.includes("wheel") || meshName.includes("rim") || meshName.includes("tire")) {
            child.position.x += meshName.includes("left") ? -0.8 : 0.8;
          }
          if (meshName.includes("door") || meshName.includes("hood") || meshName.includes("trunk") || meshName.includes("boot")) {
            child.position.y += 0.6;
            child.position.z += meshName.includes("hood") ? 0.4 : -0.4;
          }
        }
      }
    });
  }, [model, color, wheelColor, isExploded, modelKey]);

  return <primitive object={model} />;
}

export default function Vehicle3DViewer({ 
  modelUrl, 
  accentColor = "#ffffff", 
  wheelColor = "#ffffff",
  isExploded = false,
  envType = "city",
  autoRotate = false
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!modelUrl) return null;

  return (
    <ErrorBoundary>
      <div style={{ width: "100%", height: "100vh", background: "#050505" }}>
        <Canvas 
          shadows 
          camera={{ 
            position: isMobile ? [5, 3, 5] : [4, 2, 4], 
            fov: isMobile ? 50 : 35 
          }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Stage 
              environment={envType === "city" ? "city" : "night"} 
              intensity={envType === "city" ? 0.6 : 0.15}
              contactShadow={false}
              adjustCamera={false}
              shadows="contact"
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
            <ContactShadows position={[0, -0.01, 0]} opacity={0.6} scale={15} blur={2.5} far={1} />
          </Suspense>

          <OrbitControls
            enablePan={false}
            minDistance={3.5}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        color: "#00ffff",
        background: "rgba(0,0,0,0.9)",
        padding: "30px 60px",
        borderRadius: "20px",
        border: "1px solid rgba(0,255,255,0.3)",
        backdropFilter: "blur(10px)",
        textAlign: "center",
        minWidth: '250px'
      }}>
        <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            background: '#00ffff', 
            transition: 'width 0.3s ease',
            boxShadow: '0 0 10px #00ffff'
          }} />
        </div>
        <span style={{ fontSize: "12px", letterSpacing: '4px', textTransform: 'uppercase' }}>Synchronizing Assets</span>
        <span style={{ fontSize: "42px", fontWeight: "900", fontFamily: 'monospace' }}>{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}




