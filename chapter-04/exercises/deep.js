function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  } else if (
    typeof obj1 == "object" &&
    obj1 != null &&
    typeof obj2 == "object" &&
    obj2 != null
  ) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length === keys2.length) {
      const len = keys1.length;
      for (let i = 0; i < len; i++) {
        let a = keys1[i];
        let b = keys2[i];
        return a === b && deepEqual(obj1[a], obj2[b]);
      }
    }
  }
  return false;
}

let obj = { here: { is: "an" }, object: 2 };

console.log(deepEqual(obj, obj));
// → true

console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false

console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
