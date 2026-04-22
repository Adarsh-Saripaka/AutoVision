import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Car3DViewer from "./Car3DViewer";

const BODY_COLORS = ["#ffffff", "#111111", "#ff0000", "#0000ff", "#00ff00", "#ffaa00", "#555555"];
const WHEEL_COLORS = ["#ffffff", "#111111", "#444444", "#aa8800"];

export default function ViewerPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [accentColor, setAccentColor] = useState("#ffffff");
  const [wheelColor, setWheelColor] = useState("#444444");
  const [isExploded, setIsExploded] = useState(false);
  const [envType, setEnvType] = useState("city");
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    if (!state?.modelUrl) navigate("/");
  }, [state, navigate]);

  if (!state?.modelUrl) return null;

  const controlStyles = {
    section: { marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "20px" },
    label: { fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "#666", marginBottom: "12px", display: "block" },
    grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" },
    toggleBtn: (active) => ({
      flex: 1,
      padding: "10px",
      background: active ? "#00ffff" : "#222",
      color: active ? "#000" : "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.2s"
    })
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", background: "#000", overflow: "hidden" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute", top: 25, left: 25, zIndex: 100,
          padding: "12px 24px", borderRadius: "50px",
          background: "rgba(10, 10, 10, 0.8)", backdropFilter: "blur(10px)",
          color: "#fff", border: "1px solid rgba(255,255,255,0.1)",
          cursor: "pointer", fontWeight: 600
        }}
      >
        ← EXIT SHOWROOM
      </button>

      {/* Configurator Sidebar */}
      <div style={{
        position: "absolute", top: 25, right: 25, zIndex: 100, width: "300px",
        maxHeight: "calc(100vh - 50px)", overflowY: "auto",
        background: "rgba(10, 10, 10, 0.85)", backdropFilter: "blur(30px)",
        border: "1px solid rgba(0, 255, 255, 0.2)", borderRadius: "24px",
        padding: "30px", color: "#fff", fontFamily: "'Inter', sans-serif"
      }}>
        <h2 style={{ fontSize: "1.4rem", margin: "0 0 30px 0", color: "#00ffff", fontWeight: 900 }}>AUTOVISION PRO</h2>
        
        {/* Exterior Section */}
        <div style={controlStyles.section}>
          <span style={controlStyles.label}>Exterior Paint</span>
          <div style={controlStyles.grid}>
            {BODY_COLORS.map(color => (
              <button
                key={color}
                onClick={() => setAccentColor(color)}
                style={{
                  width: "40px", height: "40px", borderRadius: "50%", background: color,
                  border: accentColor === color ? "3px solid #00ffff" : "2px solid rgba(255,255,255,0.1)",
                  cursor: "pointer"
                }}
              />
            ))}
          </div>
        </div>

        {/* Wheels Section */}
        <div style={controlStyles.section}>
          <span style={controlStyles.label}>Wheel Finish</span>
          <div style={controlStyles.grid}>
            {WHEEL_COLORS.map(color => (
              <button
                key={color}
                onClick={() => setWheelColor(color)}
                style={{
                  width: "40px", height: "40px", borderRadius: "8px", background: color,
                  border: wheelColor === color ? "3px solid #00ffff" : "2px solid rgba(255,255,255,0.1)",
                  cursor: "pointer"
                }}
              />
            ))}
          </div>
        </div>

        {/* Environment Section */}
        <div style={controlStyles.section}>
          <span style={controlStyles.label}>Showroom Atmosphere</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setEnvType("city")} style={controlStyles.toggleBtn(envType === "city")}>DAYLIGHT</button>
            <button onClick={() => setEnvType("night")} style={controlStyles.toggleBtn(envType === "night")}>MIDNIGHT</button>
          </div>
        </div>

        {/* Camera/Visual Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button 
            onClick={() => setIsExploded(!isExploded)}
            style={controlStyles.toggleBtn(isExploded)}
          >
            {isExploded ? "RESET CHASSIS" : "EXPLODED VIEW"}
          </button>
          
          <button 
            onClick={() => setAutoRotate(!autoRotate)}
            style={controlStyles.toggleBtn(autoRotate)}
          >
            {autoRotate ? "STOP ROTATION" : "CINEMATIC ROTATION"}
          </button>
        </div>
      </div>

      <Car3DViewer 
        modelUrl={state.modelUrl} 
        accentColor={accentColor} 
        wheelColor={wheelColor}
        isExploded={isExploded}
        envType={envType}
        autoRotate={autoRotate}
      />
    </div>
  );
}
