let arrays = [[1, 2, 3], [4, 5], [6]];

// Array-of-Arrays -> Array
function flattening(aoa) {
  return aoa.reduce((array, currentValue) => array.concat(currentValue), []);
}

console.log(flattening(arrays));
