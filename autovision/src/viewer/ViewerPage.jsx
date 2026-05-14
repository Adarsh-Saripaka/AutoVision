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

  const uiColors = {
    bg: "#050505",
    surface: "#0f0f0f",
    accent: "#00ffff",
    border: "rgba(0, 255, 255, 0.2)",
    text: "#ffffff",
    textDim: "#666"
  };

  const controlStyles = {
    section: { marginBottom: "32px", borderBottom: `1px solid ${uiColors.border}`, paddingBottom: "24px" },
    label: { fontSize: "0.6rem", textTransform: "uppercase", fontWeight: 900, letterSpacing: "3px", color: uiColors.textDim, marginBottom: "16px", display: "block" },
    grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" },
    toggleBtn: (active) => ({
      flex: 1,
      padding: "12px",
      background: active ? uiColors.accent : "transparent",
      color: active ? "#000" : uiColors.text,
      border: `1px solid ${uiColors.border}`,
      borderRadius: "0px",
      fontSize: "0.7rem",
      fontWeight: 900,
      cursor: "pointer",
      transition: "all 0.2s ease",
      textTransform: 'uppercase',
      letterSpacing: '1px'
    })
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", background: uiColors.bg, overflow: "hidden", color: uiColors.text, fontFamily: "'Inter', sans-serif" }}>
      {/* Precision Navigation */}
      <button
        aria-label="Back to home"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute", top: 40, left: 40, zIndex: 100,
          padding: "10px 25px",
          background: uiColors.bg,
          color: uiColors.text, border: `1px solid ${uiColors.accent}`,
          cursor: "pointer", fontWeight: 900, fontSize: '0.7rem', letterSpacing: '2px',
          textTransform: 'uppercase',
          boxShadow: `0 0 20px rgba(0,255,255,0.1)`
        }}
      >
        [ EXIT_SHOWROOM ]
      </button>

      {/* Engineering Sidebar */}
      <aside style={{
        position: "absolute", top: 40, right: 40, zIndex: 100, width: "340px",
        maxHeight: "calc(100vh - 80px)", overflowY: "auto",
        background: uiColors.surface,
        border: `1px solid ${uiColors.border}`,
        padding: "40px 35px", 
        boxShadow: '20px 20px 60px rgba(0,0,0,0.8)',
        scrollbarWidth: 'none'
      }}>
        <div style={{ marginBottom: '45px', borderLeft: `4px solid ${uiColors.accent}`, paddingLeft: '20px' }}>
          <h2 style={{ fontSize: "1.8rem", margin: "0", color: uiColors.text, fontWeight: 900, letterSpacing: '-1px', textTransform: 'uppercase' }}>Config<span style={{ color: uiColors.accent }}>v1</span></h2>
          <p style={{ fontSize: '0.65rem', color: uiColors.textDim, marginTop: '5px', letterSpacing: '1px' }}>SYSTEM_CORE: ACTIVE // ASSET_ID: {state.id || '00'}</p>
        </div>
        
        <div style={controlStyles.section}>
          <label style={controlStyles.label}>Surface_Finish</label>
          <div style={controlStyles.grid}>
            {BODY_COLORS.map(color => (
              <button
                key={color}
                aria-label={`Color ${color}`}
                onClick={() => setAccentColor(color)}
                style={{
                  width: "42px", height: "42px", background: color,
                  border: accentColor === color ? `2px solid ${uiColors.accent}` : "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", transition: '0.2s',
                  boxShadow: accentColor === color ? `0 0 15px ${uiColors.accent}` : 'none'
                }}
              />
            ))}
          </div>
        </div>

        <div style={controlStyles.section}>
          <label style={controlStyles.label}>Alloy_Type</label>
          <div style={controlStyles.grid}>
            {WHEEL_COLORS.map(color => (
              <button
                key={color}
                aria-label={`Wheel ${color}`}
                onClick={() => setWheelColor(color)}
                style={{
                  width: "42px", height: "42px", background: color,
                  border: wheelColor === color ? `2px solid ${uiColors.accent}` : "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", transition: '0.2s'
                }}
              />
            ))}
          </div>
        </div>

        <div style={controlStyles.section}>
          <label style={controlStyles.label}>Environment_Render</label>
          <div style={{ display: "flex" }}>
            <button onClick={() => setEnvType("city")} style={{ ...controlStyles.toggleBtn(envType === "city"), borderRight: 'none' }}>DAYLIGHT</button>
            <button onClick={() => setEnvType("night")} style={controlStyles.toggleBtn(envType === "night")}>MIDNIGHT</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <button 
            onClick={() => setIsExploded(!isExploded)}
            style={controlStyles.toggleBtn(isExploded)}
          >
            {isExploded ? "MERGE_ASSETS" : "EXPLODE_CHASSIS"}
          </button>
          
          <button 
            onClick={() => setAutoRotate(!autoRotate)}
            style={controlStyles.toggleBtn(autoRotate)}
          >
            {autoRotate ? "MANUAL_ORBIT" : "CINEMATIC_ORBIT"}
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
