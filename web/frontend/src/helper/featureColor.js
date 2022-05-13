const COLORMIN = [255, 255, 255, 0];
const COLORMAX = [225, 108, 88, 255];

const featureColor = (f) => {
  const fraction = f.getProperty("normalizedScore") || 0;
  const R = Math.floor((COLORMAX[0] - COLORMIN[0]) * fraction) + COLORMIN[0];
  const G = Math.floor((COLORMAX[1] - COLORMIN[1]) * fraction) + COLORMIN[1];
  const B = Math.floor((COLORMAX[2] - COLORMIN[2]) * fraction) + COLORMIN[2];
  const A = Math.floor((COLORMAX[3] - COLORMIN[3]) * fraction) + COLORMIN[3];
  return `rgba(${R}, ${G}, ${B}, ${A})`;
};

export default featureColor;
