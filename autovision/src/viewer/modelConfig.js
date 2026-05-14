export const MODEL_MANIFEST = {
  "porsche_911": {
    paintParts: ["body_mesh", "hood", "door_L", "door_R"],
    wheelParts: ["rim_FL", "rim_FR", "rim_RL", "rim_RR"],
    exclusionParts: ["windshield", "window_glass"],
    scale: 1.0, 
  },
};

export const smartMatchMaterial = (meshName, matName) => {
  const name = (meshName + " " + matName).toLowerCase();
  
  const isPaint = name.includes("paint") || 
                  name.includes("body") || 
                  name.includes("car_exterior") ||
                  name.includes("metal") ||
                  name === "material_0";

  const isWheel = (name.includes("wheel") || name.includes("rim") || name.includes("alloy")) && 
                  !name.includes("tire") && 
                  !name.includes("rubber");

  const isGlass = name.includes("glass") || 
                  name.includes("window") || 
                  name.includes("windshield") ||
                  name.includes("transparent");

  return { isPaint, isWheel, isGlass };
};
