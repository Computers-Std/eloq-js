const SCRIPTS = require("/home/ukiran/prog/eloq-js/chapter-05/code/scripts.js");

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    )
      return script;
  }
  return null;
}
// console.log(characterScript(6912));

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.find((c) => c.name == name);
    if (!known) {
      counts.push({ name, count: 1 });
    } else {
      known.count++;
    }
  }
  return counts;
}
// console.log(countBy([1, 2, 3, 4, 5], (n) => n > 2));

function dominantDirection(text) {
  let directionIndex = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  });

  // Filter out 'none' directions
  directionIndex = directionIndex.filter(({ name }) => name !== "none");

  const maxCount = Math.max(...directionIndex.map((i) => i.count));
  const maxObject = directionIndex.find((i) => i.count === maxCount);

  return maxObject.name;
}
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
