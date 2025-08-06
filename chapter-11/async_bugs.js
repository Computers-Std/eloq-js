// Broken Function
async function fileSizes(files) {
  let list = "";
  await Promise.all(
    files.map(async (fileName) => {
      list += fileName + ": " + (await textFile(fileName)).length + "\n";
    }),
  );
  return list;
}

async function fileSizes(files) {
  let lines = files.map(async (fileName) => {
    return fileName + ": " + (await textFile(fileName)).length;
  });
  return (await Promise.all(lines)).join("\n");
}
