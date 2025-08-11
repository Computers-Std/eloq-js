function talksAbout(node, string) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    for (let child of node.childNodes) {
      if (talksAbout(child, string)) {
        return true;
      }
    }
    return false;
  }
}

let arrayish = { 0: "one", 1: "two", length: 2 };
let array = Array.from(arrayish);
console.log(array.map((s) => s.toUpperCase()));
