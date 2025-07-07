function arrayToList(array) {
  const first = array.shift();
  if (first == undefined) {
    return null;
  } else {
    return {
      value: first,
      rest: arrayToList(array),
    };
  }
}
console.log(arrayToList([1, 2, 3]));

function listToArray(list) {
  if (list === null) {
    return [];
  } else {
    return [list.value].concat(listToArray(list.rest));
  }
}
console.log(listToArray(arrayToList([1, 2, 3])));

function prepend(val, list) {
  return {
    value: val,
    rest: list,
  };
}
console.log(prepend(0, arrayToList([1, 2, 3])));

function nth(list, num) {
  if (num === 0) {
    return list.value;
  } else {
    return nth(list.rest, --num);
  }
}

console.log(nth(arrayToList([3, 2, 8, 9, 6, 9]), 0));
console.log(nth(arrayToList([3, 2, 8, 9, 6, 9]), 3));
console.log(nth(arrayToList([10, 20, 30]), 1));
