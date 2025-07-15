// Value, Function, Function, Body -> For Loop

function loop(val, condit, update, body) {
  while (condit(val)) {
    body(val);
    val = update(val);
  }
}

loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log,
);

console.log("------");

for (let i = 3; i > 0; i--) {
  console.log(i);
}
