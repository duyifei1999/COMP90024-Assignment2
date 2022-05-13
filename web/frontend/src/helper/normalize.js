const normalize = (dict) => {
  let min = 999;
  let max = -999;

  for (const key in dict) {
    min = dict[key].mean < min ? dict[key].mean : min;
    max = dict[key].mean > max ? dict[key].mean : max;
  }

  const range = max - min;

  // console.log(range);
  // console.log(min);
  // console.log(max);

  for (const key in dict) {
    dict[key].normalizedMean = (dict[key].mean - min) / range;
  }
};

export default normalize;
