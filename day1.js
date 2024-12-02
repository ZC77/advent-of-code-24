const fs = require("fs");

fs.readFile("./day1_input.txt", "utf8", (err, data) => {
  // Splits each line into a string in array

  const splitData = data.split("\r\n");

  const orderedFirstList = splitData.map((line) => line.slice(0, 5)).sort((a, b) => a - b);

  const orderedSecondList = splitData.map((line) => line.slice(-5)).sort((a, b) => a - b);

  const distanceTotal = orderedFirstList
    .map((val, idx) => Math.abs(val - orderedSecondList[idx]))
    .reduce((prev, curr) => prev + curr, 0);

  //   console.log(orderedFirstList);
  //   console.log(orderedSecondList);
  console.log(`Day 1 pt. 1: ${distanceTotal}`);

  /** PART 2 */

  // We know both lists are already sorted, so checking occurrence(s) of N from first list in second list can be done as follows

  // for (length of first list)
  // get number in first list with index
  // Skip past all numbers that are smaller

  // OR we could just use a map...

  const firstListOccurrenceMap = new Map();
  orderedFirstList.map((val) => {
    const hasValue = firstListOccurrenceMap.has(val);

    if (hasValue) {
      // We've seen it before,
      firstListOccurrenceMap.set(val, firstListOccurrenceMap.get(val) + 1);
    } else {
      // Doesn't exist in the map yet. So we say we've seen it once.
      firstListOccurrenceMap.set(val, 1);
    }
  });

  const secondListOccurrenceMap = new Map();
  orderedSecondList.map((val) => {
    const hasValue = secondListOccurrenceMap.has(val);

    if (hasValue) {
      secondListOccurrenceMap.set(val, secondListOccurrenceMap.get(val) + 1);
    } else {
      secondListOccurrenceMap.set(val, 1);
    }
  });

  // Now, check how many times values in left list appear in the right. Sum them up
  let similarityScore = 0;
  firstListOccurrenceMap.forEach((val, key) => {
    // Is it in the second list?
    const occurrenceInOtherList = secondListOccurrenceMap.get(key);
    if (occurrenceInOtherList != undefined) {
      console.log(`in both lists: ${key}`);
      similarityScore += occurrenceInOtherList * key;
    }
  });

  console.log(`Day 1 pt. 2: ${similarityScore}`);
});
