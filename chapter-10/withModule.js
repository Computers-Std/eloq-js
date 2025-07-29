const ordinal = require("ordinal");
const { days, months } = require("date-names");

exports.formatDate = function (date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, (tag) => {
    if (tag == "YYYY") return date.getFullYear();
    if (tag == "M") return date.getMonth();
    if (tag == "MMMM") return months[date.getMonth()];
    if (tag == "D") return date.getDate();
    if (tag == "Do") return ordinal(date.getDate());
    if (tag == "dddd") return days[date.getDay()];
  });
};

// Simplified require
function require(name) {
  if (!(name in require.cache)) {
    let code = readFile(name);
    let exports = (require.cache[name] = {});
    let wrapper = Function("require, exports", code);
    wrapper(require, exports);
  }
  return require.cache[name];
}
require.cache = Object.create(null);

const { find_path } = require("dijkstrajs");
let graph = {};
for (let node of Object.keys(roadGraph)) {
  let edges = (graph[node] = {});
  for (let dest of roadGraph[node]) {
    edges[dest] = 1;
  }
}
console.log(find_path(graph, "Post Office", "Cabin"));
// → ["Post Office", "Alice's House", "Cabin"]
