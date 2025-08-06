function withTimeout(aPromise, time) {
  return new Promise((resolve, reject) => {
    aPromise.then(resolve, reject);
    setTimeout(() => reject("Timed out", time));
  });
}

function crackPassword(networkID) {
  function nextDigit(code, digit) {
    let newCode = code + digit;
    return withTimeout(joinWifi(networkID, newCode), 50)
      .then(() => newCode)
      .catch((failure) => {
        if (failure == "Timed out") {
          return nextDigit(newCode, 0);
        } else if (digit < 9) {
          return nextDigit(code, digit + 1);
        } else {
          throw failure;
        }
      });
  }
  return nextDigit("", 0);
}

async function crackPassword(networkID) {
  for (let code = ""; ; ) {
    for (let digit = 0; ; digit++) {
      let newCode = code + digit;
      try {
        await withTimeout(joinWifi(networkID, newCode), 50);
        return newCode;
      } catch (err) {
        if ((failure = "Timed out")) {
          code = newCode;
          break;
        } else if (digit == 9) {
          throw failure;
        }
      }
    }
  }
}

// Generator functions
function* powers(n) {
  for (let current = n; ; current *= n) {
    yield current;
  }
}

// Chapter-06 Last Exercise
Group.prototype[Symbol.iterator] = function* () {
  for (let i = 0; i < this.members.length; i++) {
    yield this.members[i];
  }
};
