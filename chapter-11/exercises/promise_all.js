function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) {
      resolve([]); // Immediately resolve if empty array
      return;
    }

    const results = new Array(promises.length);
    let remaining = promises.length;

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // Handle non-promise values
        .then((result) => {
          results[index] = result; // Store in correct position
          remaining--;
          if (remaining === 0) {
            resolve(results); // Resolve when all complete
          }
        })
        .catch(reject); // Reject immediately on any error
    });
  });
}

// Test code.

Promise_all([]).then((array) => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then((array) => {
    console.log("We should not get here");
  })
  .catch((error) => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });
