const HOUSINGCOLORMIN = [255, 255, 255, 0];
const HOUSINGCOLORMAX = [108, 88, 225, 255];
const LANCOLORMIN = [255, 255, 255, 0];
const LANCOLORMAX = [225, 108, 88, 255];

const featureColor = (f, scenario) => {
  const colorMin = scenario === "housing" ? HOUSINGCOLORMIN : LANCOLORMIN;
  const colorMax = scenario === "housing" ? HOUSINGCOLORMAX : LANCOLORMAX;
  const fraction = f.getProperty("metaData").normalizedMean || 0;
  const R = Math.floor((colorMax[0] - colorMin[0]) * fraction) + colorMin[0];
  const G = Math.floor((colorMax[1] - colorMin[1]) * fraction) + colorMin[1];
  const B = Math.floor((colorMax[2] - colorMin[2]) * fraction) + colorMin[2];
  const A = Math.floor((colorMax[3] - colorMin[3]) * fraction) + colorMin[3];
  return `rgba(${R}, ${G}, ${B}, ${A})`;
};

export default featureColor;
