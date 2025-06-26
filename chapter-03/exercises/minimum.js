function min(a, b) {
  if (a > b) {
    return b;
  } else return a;
}

let min2 = (a, b) => {
  if (a > b) {
    return b;
  } else return a;
};

console.log(min(0, 10));
console.log(min(0, -10));
console.log(min2(0, 10));
console.log(min2(0, -10));
