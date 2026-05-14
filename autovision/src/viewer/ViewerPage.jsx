import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Car3DViewer from "./Car3DViewer";
import "./ViewerPage.css";

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

  return (
    <div className="viewer-container">
      {/* Precision Navigation */}
      <button
        aria-label="Back to home"
        className="exit-btn"
        onClick={() => navigate(-1)}
      >
        [ EXIT_SHOWROOM ]
      </button>

      {/* Engineering Sidebar / Bottom Sheet on Mobile */}
      <aside className="config-sidebar">
        <div className="sidebar-header">
          <h2 style={{ fontSize: "1.8rem", margin: "0", fontWeight: 900, letterSpacing: '-1px', textTransform: 'uppercase' }}>
            Config<span style={{ color: "#00ffff" }}>v1</span>
          </h2>
          <p style={{ fontSize: '0.65rem', color: "#666", marginTop: '5px', letterSpacing: '1px' }}>
            SYSTEM_CORE: ACTIVE // ASSET_ID: {state.id || '00'}
          </p>
        </div>
        
        {/* Exterior Section */}
        <div className="config-section">
          <label className="section-label">Surface_Finish</label>
          <div className="color-grid">
            {BODY_COLORS.map(color => (
              <button
                key={color}
                aria-label={`Color ${color}`}
                onClick={() => setAccentColor(color)}
                style={{
                  width: "100%", aspectRatio: '1/1', background: color,
                  border: accentColor === color ? `2px solid #00ffff` : "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", transition: '0.2s',
                  boxShadow: accentColor === color ? `0 0 15px #00ffff` : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Wheels Section */}
        <div className="config-section">
          <label className="section-label">Alloy_Type</label>
          <div className="color-grid">
            {WHEEL_COLORS.map(color => (
              <button
                key={color}
                aria-label={`Wheel ${color}`}
                onClick={() => setWheelColor(color)}
                style={{
                  width: "100%", aspectRatio: '1/1', background: color,
                  border: wheelColor === color ? `2px solid #00ffff` : "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", transition: '0.2s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Environment Section */}
        <div className="config-section">
          <label className="section-label">Environment_Render</label>
          <div className="toggle-group">
            <button 
              onClick={() => setEnvType("city")} 
              className={`toggle-btn ${envType === "city" ? 'active' : ''}`}
              style={{ borderRight: 'none' }}
            >
              DAYLIGHT
            </button>
            <button 
              onClick={() => setEnvType("night")} 
              className={`toggle-btn ${envType === "night" ? 'active' : ''}`}
            >
              MIDNIGHT
            </button>
          </div>
        </div>

        {/* Visual Matrix Section */}
        <div className="visual-matrix">
          <button 
            onClick={() => setIsExploded(!isExploded)}
            className={`toggle-btn ${isExploded ? 'active' : ''}`}
          >
            {isExploded ? "MERGE_ASSETS" : "EXPLODE_CHASSIS"}
          </button>
          
          <button 
            onClick={() => setAutoRotate(!autoRotate)}
            className={`toggle-btn ${autoRotate ? 'active' : ''}`}
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
