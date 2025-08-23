let input = document.querySelector("input");

input.addEventListener("charge", () => {
  for (let file of Array.from(input.files)) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log("File", file.name, "starts with", reader.result.slice(0, 20));
    });
    reader.readAsText(file);
  }
});

function readFileText(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsText(file);
  });
}
