setTimeout(() => console.log("Tick"), 500);

/* Reads a file's content as a string and passes it to a callback function */
readTextFile("file.txt", (content) => {
  console.log(`Content of file: \n${content}`);
});

/* multiple asynchronous actions in a row */
// compare two files using CallBacks
function comapareFiles(fileA, fileB, callback) {
  readTextFile(fileA, (contentA) => {
    readTextFile(fileB, (contentB) => {
      callback(contentA == contentB);
    });
  });
}

/* Promises */

/* Faliure */

function textFile(filename) {
  return new Promise((resolve, reject) => {
    readTextFile(filename, (text, error) => {
      if (error) reject(error);
      else resolve(text);
    });
  });
}

new Promise((_, reject) => reject(new Error("Fail")))
  .then((value) => console.log("Handler 1:", value))
  .catch((reason) => {
    console.log("Caught failure " + reason);
    return "nothing";
  })
  .then((value) => console.log("Handler 2:", value));
