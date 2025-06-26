function countBs(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "B") {
      count++;
    }
  }
  return count;
}

console.log(countBs("BOB"));
// → 2

function countChar(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}

console.log(countChar("kakkerlak", "k"));
// → 4
