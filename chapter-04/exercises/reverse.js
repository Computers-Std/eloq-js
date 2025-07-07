function reverseArray(array) {
  let newArray = [];
  const length = array.length;
  for (i = length - 1; i >= 0; i--) {
    newArray.push(array[i]);
  }
  return newArray;
}
// console.log(reverseArray([1, 2, 3]));

function reverseArrayInPlace(array) {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    let temp = array[left];
    array[left] = array[right];
    array[right] = temp;

    left++;
    right--;
  }
  return array;
}

console.log(reverseArrayInPlace([1, 2, 3]));
