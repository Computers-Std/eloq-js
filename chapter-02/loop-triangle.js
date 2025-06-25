let number = 7;
let string = "#";
function triangle() {
  for (let i = 0; i < number; i++) {
    console.log(string);
    string += "#";
  }
}

triangle();
