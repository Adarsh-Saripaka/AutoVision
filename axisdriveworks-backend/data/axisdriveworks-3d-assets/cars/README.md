# AxisDriveWorks 3D Assets

This repository contains GLB-format 3D car models used in the AxisDriveWorks project for interactive, browser-based rendering with Three.js.

## Purpose
- Provide 3D car assets for client-side loading
- Ensure direct binary access for Three.js loaders
- Avoid Git LFS to prevent asset resolution issues in static hosting environments

## Format
- File type: `.glb`
- Usage: Loaded directly in the browser via Three.js / React Three Fiber

## Notes
- Models are stored without Git LFS for compatibility with frontend rendering
- Some models may be high-poly and can require future optimization (Draco compression / mesh decimation)

## Related Project
This asset repository is used by the AxisDriveWorks web platform for 3D visualization.
