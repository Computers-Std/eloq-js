fetch("https://eloquentjavascript.net/example/data.txt")
  .then((response) => response.text())
  .then((text) => console.log(text));

// fetch("https://eloquentjavascript.net/example/data.txt")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

fetch("https://eloquentjavascript.net/example/data.txt", {
  method: "DELETE",
}).then((response) => {
  console.log(response.status);
});

fetch("https://eloquentjavascript.net/example/data.txt", {
  headers: { Range: "bytes=8-19" },
})
  .then((response) => response.text())
  .then(console.log);
