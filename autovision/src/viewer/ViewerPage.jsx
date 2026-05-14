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
    section: { marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "24px" },
    label: { fontSize: "0.65rem", textTransform: "uppercase", fontWeight: 800, letterSpacing: "2px", color: "#888", marginBottom: "16px", display: "block" },
    grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" },
    toggleBtn: (active) => ({
      flex: 1,
      padding: "12px",
      background: active ? "#00ffff" : "rgba(255,255,255,0.05)",
      color: active ? "#000" : "#fff",
      border: active ? "1px solid #00ffff" : "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      fontSize: "0.75rem",
      fontWeight: 900,
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      textTransform: 'uppercase'
    })
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", background: "#050505", overflow: "hidden", color: '#fff' }}>
      {/* Back Button */}
      <button
        aria-label="Back to previous page"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute", top: 30, left: 30, zIndex: 100,
          padding: "12px 28px", borderRadius: "50px",
          background: "rgba(10, 10, 10, 0.7)", backdropFilter: "blur(20px)",
          color: "#fff", border: "1px solid rgba(255,255,255,0.15)",
          cursor: "pointer", fontWeight: 700, fontSize: '0.8rem', letterSpacing: '1px'
        }}
      >
        ← EXIT SHOWROOM
      </button>

      {/* Configurator Sidebar */}
      <aside style={{
        position: "absolute", top: 30, right: 30, zIndex: 100, width: "320px",
        maxHeight: "calc(100vh - 60px)", overflowY: "auto",
        background: "rgba(15, 15, 15, 0.8)", backdropFilter: "blur(40px)",
        border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "28px",
        padding: "40px 30px", boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        scrollbarWidth: 'none'
      }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: "1.6rem", margin: "0", color: "#00ffff", fontWeight: 900, letterSpacing: '-1px' }}>CONFIGURATOR</h2>
          <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '5px' }}>Customizing Model {state.id || 'Active'}</p>
        </div>
        
        {/* Exterior Section */}
        <div style={controlStyles.section}>
          <label style={controlStyles.label}>Exterior Finish</label>
          <div style={controlStyles.grid}>
            {BODY_COLORS.map(color => (
              <button
                key={color}
                aria-label={`Select color ${color}`}
                onClick={() => setAccentColor(color)}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%", background: color,
                  border: accentColor === color ? "3px solid #00ffff" : "2px solid rgba(255,255,255,0.1)",
                  boxShadow: accentColor === color ? '0 0 15px rgba(0,255,255,0.3)' : 'none',
                  cursor: "pointer", transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
            ))}
          </div>
        </div>

        {/* Wheels Section */}
        <div style={controlStyles.section}>
          <label style={controlStyles.label}>Wheel Alloy</label>
          <div style={controlStyles.grid}>
            {WHEEL_COLORS.map(color => (
              <button
                key={color}
                aria-label={`Select wheel color ${color}`}
                onClick={() => setWheelColor(color)}
                style={{
                  width: "44px", height: "44px", borderRadius: "10px", background: color,
                  border: wheelColor === color ? "3px solid #00ffff" : "2px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
            ))}
          </div>
        </div>

        {/* Environment Section */}
        <div style={controlStyles.section}>
          <label style={controlStyles.label}>Lighting Mode</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setEnvType("city")} style={controlStyles.toggleBtn(envType === "city")}>DAYLIGHT</button>
            <button onClick={() => setEnvType("night")} style={controlStyles.toggleBtn(envType === "night")}>MIDNIGHT</button>
          </div>
        </div>

        {/* Camera/Visual Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <button 
            onClick={() => setIsExploded(!isExploded)}
            style={controlStyles.toggleBtn(isExploded)}
          >
            {isExploded ? "MERGE CHASSIS" : "EXPLODED VIEW"}
          </button>
          
          <button 
            onClick={() => setAutoRotate(!autoRotate)}
            style={controlStyles.toggleBtn(autoRotate)}
          >
            {autoRotate ? "STATIONARY" : "CINEMATIC SPIN"}
          </button>
        </div>
      </aside>

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
