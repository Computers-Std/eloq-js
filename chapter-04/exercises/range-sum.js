function range(start, end, step = 1) {
  let arr = [];
  for (i = start; i <= end; i += step) {
    arr.push(i);
  }
  return arr;
}
console.log(range(1, 10));
console.log(range(1, 10, 2));

function sum(array) {
  let result = 0;
  for (let num of array) {
    result += num;
  }
  return result;
}
console.log(sum(range(1, 10)));
