/**
 * Model Configuration Manifest
 * This file maps 3D models to their specific material and mesh properties.
 * It allows the viewer to be data-driven rather than relying on fragile name guessing.
 */

export const MODEL_MANIFEST = {
  // Example for a specific car (replace 'url' with your actual model path key)
  "porsche_911": {
    paintParts: ["body_mesh", "hood", "door_L", "door_R"],
    wheelParts: ["rim_FL", "rim_FR", "rim_RL", "rim_RR"],
    exclusionParts: ["windshield", "window_glass"],
    scale: 1.0, // Manual scale override if needed
  },
  // Add more entries as you find the mesh names for your 20+ models
};

/**
 * Fallback logic to "guess" materials if the model isn't in the manifest.
 * This is a 'Smart Matcher' that uses common 3D artist naming conventions.
 */
export const smartMatchMaterial = (meshName, matName) => {
  const name = (meshName + " " + matName).toLowerCase();
  
  // Paint detection
  const isPaint = name.includes("paint") || 
                  name.includes("body") || 
                  name.includes("car_exterior") ||
                  name.includes("metal") ||
                  name === "material_0";

  // Wheel detection
  const isWheel = (name.includes("wheel") || name.includes("rim") || name.includes("alloy")) && 
                  !name.includes("tire") && 
                  !name.includes("rubber");

  // Glass/Transparent detection
  const isGlass = name.includes("glass") || 
                  name.includes("window") || 
                  name.includes("windshield") ||
                  name.includes("transparent");

  return { isPaint, isWheel, isGlass };
};
