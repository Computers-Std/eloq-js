function from(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (!result.includes(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}

let testArray = from([10, 20, 20, 10, 30]);
console.log(String(testArray));
