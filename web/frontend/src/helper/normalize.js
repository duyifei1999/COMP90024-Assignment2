const normalizeHousing = (dict) => {
  // let min = 999;
  // let max = -999;

  // for (const key in dict) {
  //   min = dict[key].mean < min ? dict[key].mean : min;
  //   max = dict[key].mean > max ? dict[key].mean : max;
  // }

  // const range = max - min;

  // // console.log(range);
  // // console.log(min);

  // Object.entries(dict).forEach(([key, value]) => {
  //   if (range === 0) value.normalizedScore = 0;
  //   else value.normalizedScore = (value.mean - min) / range;
  // });
  let min = 0;
  let max = -999;

  for (const key in dict) {
    // min = dict[key]["count"] < min ? dict[key]["count"] : min;
    max = dict[key]["count"] > max ? dict[key]["count"] : max;
  }

  const range = max - min;

  Object.entries(dict).forEach(([key, value]) => {
    if (range === 0) value.normalizedScore = 0;
    else value.normalizedScore = (value["count"] - min) / range;
  });
};

const normalizeLanguage = (dict) => {
  let min = 0;
  let max = -999;

  for (const key in dict) {
    // min = dict[key]["count"] < min ? dict[key]["count"] : min;
    max = dict[key]["count"] > max ? dict[key]["count"] : max;
  }

  const range = max - min;

  Object.entries(dict).forEach(([key, value]) => {
    if (range === 0) value.normalizedScore = 0;
    else value.normalizedScore = (value["count"] - min) / range;
  });
};

export { normalizeHousing, normalizeLanguage };
