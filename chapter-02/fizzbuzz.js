let range = 100;

/*
function fizzbuzz() {
    for (let n = 1; n <= range; n++) {
        if (((n % 3) === 0) && ((n % 5) === 0)) {
            console.log("FizzBuzz")
        } else if ((n % 3) === 0) {
            console.log("Fizz")
        } else if ((n % 5) === 0) {
            console.log("Buzz")
        } else console.log(n)
    }
}
*/

function fizzbuzz() {
  for (let n = 0; n <= range; n++) {
    let output = "";

    if (n % 3 === 0) {
      output += "Fizz";
    }

    if (n % 5 === 0) {
      output += "Buzz";
    }
    // No output
    console.log(output || n);
  }
}

fizzbuzz();
