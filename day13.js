const x = "x";
const testData = [7, 13, x, x, 59, x, 31, 19];
const data = [
  17,
  x,
  x,
  x,
  x,
  x,
  x,
  41,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  937,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  13,
  x,
  x,
  x,
  x,
  23,
  x,
  x,
  x,
  x,
  x,
  29,
  x,
  397,
  x,
  x,
  x,
  x,
  x,
  37,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  x,
  19,
];

const getNextDeparture = (timestamp) => (id) => {
  let time = 0;
  while (time < timestamp) {
    time += id;
  }
  return { time, id };
};
function question1(data, timestamp) {
  const nextDepartures = data
    .filter((item) => typeof item === "number")
    .map(getNextDeparture(timestamp))
    .sort((a, b) => a.time - b.time);
  const firstDeparture = nextDepartures[0].time;
  return (firstDeparture - timestamp) * nextDepartures[0].id;
}

// console.log("question1", question1(data, 1007268));

const test2 = (data, time) =>
  data.every((item, index) => {
    return typeof item === "string" || (time + index) % item === 0;
  });

function question2(data) {
  let time = 0;
  const minDelta = data.slice().filter((a) => typeof a === "number")[0];

  while (!test2(data, time)) {
    time = time + minDelta;
    if (time % 100000000 === 0) {
      console.log(time);
    }
  }
  return time;
}

console.log("question2", question2(data));
