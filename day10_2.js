const testData = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];

const testData2 = [
  28,
  33,
  18,
  42,
  31,
  14,
  46,
  20,
  48,
  47,
  24,
  23,
  49,
  45,
  19,
  38,
  39,
  11,
  1,
  32,
  25,
  35,
  8,
  17,
  7,
  9,
  4,
  2,
  34,
  10,
  3,
];

const data = [
  56,
  139,
  42,
  28,
  3,
  87,
  142,
  57,
  147,
  6,
  117,
  95,
  2,
  112,
  107,
  54,
  146,
  104,
  40,
  26,
  136,
  127,
  111,
  47,
  8,
  24,
  13,
  92,
  18,
  130,
  141,
  37,
  81,
  148,
  31,
  62,
  50,
  80,
  91,
  33,
  77,
  1,
  96,
  100,
  9,
  120,
  27,
  97,
  60,
  102,
  25,
  83,
  55,
  118,
  19,
  113,
  49,
  133,
  14,
  119,
  88,
  124,
  110,
  145,
  65,
  21,
  7,
  74,
  72,
  61,
  103,
  20,
  41,
  53,
  32,
  44,
  10,
  34,
  121,
  114,
  67,
  69,
  66,
  82,
  101,
  68,
  84,
  48,
  73,
  17,
  43,
  140,
];

function question2(data) {
  const dataSorted = [0].concat(data.slice().sort((a, b) => a - b));
  console.log({ dataSorted });
  const deviceAdapter = dataSorted[dataSorted.length - 1] + 3;
  const differences = dataSorted
    .concat(deviceAdapter)
    .map((item, index, arr) =>
      index === arr.length - 1 ? 0 : arr[index + 1] - item
    );
  console.log({ differences });
  const sequencesOfOnes = differences
    .reduce(
      (result, item) => {
        if (item === 1) {
          result[result.length - 1] = result[result.length - 1] + 1;
        } else {
          result.push(0);
        }
        return result;
      },
      [0]
    )
    .filter((x) => x > 2);
  console.log({ sequencesOfOnes });
  const combinations = sequencesOfOnes.map((n) => {
    switch (n) {
      case 3:
        return 5;
      case 4:
        return 11;
    }
  });
  console.log({ combinations });
  const result = combinations.reduce((result, x) => result * x, 1);
  console.log({ result });
}

question2(testData2);
