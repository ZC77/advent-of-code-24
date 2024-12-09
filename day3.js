const fs = require("fs");

fs.readFile("./day3_input.txt", "utf8", (err, data) => {
  const mulRegex = /(mul\([0-9]*,[0-9]*\))/g;
  const numbersRegex = /([0-9]+)/g;

  const matchedArray = data.match(mulRegex);
  const numbersArray = matchedArray.map((str) => str.match(numbersRegex));

  const result = numbersArray.map((numArr) => numArr[0] * numArr[1]).reduce((acc, curr) => acc + curr, 0);

  //   console.log(result);

  // Part 2
  // Split the string whenever we see a 'do' or 'dont'
  const doDontRegex = /(do\(\))|(don't\(\))/g;

  const stringArray = data.split(doDontRegex).filter((val) => val != undefined);

  let addToString = true;
  let acc = "";

  for (let i = 0; i < stringArray.length; i++) {
    const curr = stringArray[i];

    if (curr == "don't()") {
      addToString = false;
    }

    if (curr == "do()") {
      addToString = true;
    }

    if (addToString) {
      acc += curr;
    }
  }

  const part2Matched = acc.match(mulRegex).map((str) => str.match(numbersRegex));
  const part2Result = part2Matched.map((numArr) => numArr[0] * numArr[1]).reduce((acc, curr) => acc + curr, 0);
  console.log(part2Result);
});
