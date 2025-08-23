const URL = "https://eloquentjavascript.net/author";

const types = [
  "text/plain",
  "text/html",
  "application/json",
  "application/rainbows+unicorns",
];

async function getTypeData() {
  for (let type of types) {
    let response = await fetch(URL, {
      headers: {
        Accept: type,
      },
    });
    console.log(`${type}: ${await response.text()}\n`);
  }
}

getTypeData();
