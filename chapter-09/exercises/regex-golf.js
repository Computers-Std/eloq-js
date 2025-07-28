// Fill in the regular expressions

verify(/ca[r|t]/, ["my car", "bad cats"], ["camper", "high art"]);

verify(/pr?op/, ["pop culture", "mad props"], ["plop", "prrrop"]);

verify(
  /ferr[e|y|a].*/,
  ["ferret", "ferry", "ferrari"],
  ["ferrum", "transfer A"],
);

verify(
  /\w*ious\b/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"],
);

verify(/\s[.,;:]/, ["bad punctuation ."], ["escape the period"]);

verify(
  /\b\w{7,}/,
  ["Siebentausenddreihundertzweiundzwanzig"],
  ["no", "three small words"],
);

verify(
  /\b(?!\w*e|\w*E)\w+\b/,
  ["red platypus", "wobbling nest"],
  ["earth bed", "bedrøvet abe", "BEET"],
);

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes)
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  for (let str of no)
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
}
