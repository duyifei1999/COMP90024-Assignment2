const normalize = (dict) => {
  let min = 999;
  let max = -999;
  for (const key in dict) {
    min = dict[key].raw < min ? dict[key].raw : min;
    max = dict[key].raw > max ? dict[key].raw : max;
  }

  const range = max - min;

  // console.log(range);
  // console.log(min);
  // console.log(max);

  for (const key in dict) {
    dict[key].normalized = (dict[key].raw - min) / range;
  }
};

export default normalize;
