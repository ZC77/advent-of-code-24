const fs = require("fs");

fs.readFile("./day2_mini.txt", "utf8", (err, data) => {
  const splitData = data.split("\r\n");

  // Conditions of a safe report
  // Either all increasing or decreasing.
  // Each adjacent level difference 1 <= n <= 3

  const arrayified = splitData.map((line) => line.split(" "));

  //   console.log(arrayified);

  const reports = arrayified.map((arr) => {
    // 1st case, are they *all* decreasing or increasing?
    // Logic to determine that would be
    // abs(first number - last number) >= array.length - 1
    const increasingOrDecreasing = Math.abs(arr[0] - arr[arr.length - 1]) >= arr.length - 1;
    if (!increasingOrDecreasing) {
      return false;
    }

    return arr
      .map((val, idx, thisArray) => {
        const hasNext = idx < thisArray.length - 1;
        if (hasNext) {
          const next = thisArray[idx + 1];
          const difference = val - next;
          return difference;
        }
        return undefined; // last value has nothing to compare to
      })
      .slice(0, -1)
      .reduce(
        (acc, curr, idx, thisArray) =>
          acc && Math.abs(curr) >= 1 && Math.abs(curr) <= 3 && Math.sign(curr) == Math.sign(thisArray[0]),
        true
      );
  });

  const numOfSafeReports = reports.reduce((acc, curr) => (curr ? (acc += 1) : (acc += 0)), 0);
  // console.log(numOfSafeReports);

  /** PART 2 */
  // Same rules apply as before, but we can remove a single datapoint to make it compliant.

  //

  // const part2 = arrayified.map((arr, idxMain) => {
  //   const initial = arr
  //     .map((val, idx, thisArray) => {
  //       const hasNext = idx < thisArray.length - 1;
  //       if (hasNext) {
  //         const next = thisArray[idx + 1];
  //         const difference = val - next;
  //         return difference;
  //       }
  //       return undefined; // last value has nothing to compare to
  //     })
  //     .slice(0, -1);

  //   let hasRemoved = false;

  //   // Diabolical algorithm
  //   // Map through the difference array and detect if it's out of range
  //   // Also detect if the sign is an issue.
  //   // If out of range and haven't REMOVED BEFORE, remove it from the array and set hasRemoved to true
  //   // Otherwise just return the value. We don't care if it can't be saved.
  //   const processed = initial.map((val, idx, thisArray) => {
  //     const withinRange = Math.abs(val) >= 1 && Math.abs(val) <= 3;
  //     const sameSign = Math.sign(val) == Math.sign(thisArray[0]);
  //     if ((!sameSign || !withinRange) && !hasRemoved) {
  //       console.log(`removing unsafe difference ${val} from line ${idxMain + 1}`);
  //       hasRemoved = true;
  //       return undefined;
  //     }
  //     return val;
  //   });

  //   console.log(processed);

  //   return processed
  //     .filter((val) => val != undefined)
  //     .reduce(
  //       (acc, curr, idx, thisArray) =>
  //         acc && Math.abs(curr) >= 1 && Math.abs(curr) <= 3 && Math.sign(curr) == Math.sign(thisArray[0]),
  //       true
  //     );
  // });

  // const part2Reports = part2.reduce((acc, curr) => (curr ? (acc += 1) : (acc += 0)), 0);
  // console.log(`Part2 reports: ${part2Reports}`);

  // const getDifference = (val1, val2) => {
  //   const difference = Math.abs(val1 - val2);
  //   return { legal: difference >= 1 && difference <= 3, value: val1 - val2 };
  // };

  // const hasSameSign = (val1, val2) => {
  //   return Math.sign(val1) == Math.sign(val2);
  // };

  // const part2algo2 = arrayified.map((arr, idxMain) => {
  //   // Sliding window with +1 lookahead
  //   // Same algo as before, compared curr with next to check polarity and difference are within bounds
  //   // Establish a flag to track that a value has been removed
  //   // If a value is illegal, extend window to check next value
  //   // Check difference between those two, if defined and OK

  //   let hasRemoved = false;
  //   let removeNext = false;
  //   let polarity;

  //   const processed = arr.map((val, idx, thisArray) => {
  //     if (removeNext) {
  //       removeNext = false;
  //       return true;
  //     }
  //     const hasNext = idx < thisArray.length - 1;
  //     if (hasNext) {
  //       const next = thisArray[idx + 1];
  //       polarity = Math.sign(val - thisArray[idx + 1]);
  //       const { legal } = getDifference(val, next);

  //       if (legal && sameSign) {
  //         return true;
  //       } else {
  //         if (!hasRemoved) {
  //           // We haven't removed, so lets try if it would make a difference
  //           const existsOneAhead = idx < thisArray.length - 2;
  //           if (existsOneAhead) {
  //             const { legal: legalOneAhead } = getDifference(val, thisArray[idx + 2]);
  //             console.log(`legalOneAhead: ${legalOneAhead}`);
  //             const hasSameSignOneAhead = polarity == Math.sign(val - thisArray[idx + 2]);
  //             console.log(`hasSameSignOneAhead: ${legalOneAhead}`);
  //             if (legalOneAhead && hasSameSignOneAhead) {
  //               console.log(`at ${idx} removing next... `);
  //               hasRemoved = true;
  //               removeNext = true;
  //               return true;
  //             }
  //           }
  //         }
  //         // not going to be safe.
  //         return false;
  //       }
  //     }
  //     return undefined;
  //   });

  //   const removeUndefined = processed.filter((val) => val != undefined);
  //   console.log(removeUndefined);

  //   return removeUndefined.reduce((acc, curr) => acc && curr);
  // });

  // const final = part2algo2.reduce((acc, curr) => (curr ? acc + 1 : acc), 0);

  // console.log(final);

  const isNextLegal = (curr, next) => (next > curr && curr + 4 < next) || (next <= curr - 1 && next > curr - 4);
  const attempt3 = arrayified.map((arr, idxMain) => {
    let acc = JSON.parse(JSON.stringify([arr[0]]));
    let input = JSON.parse(JSON.stringify(arr.slice(1)));
    console.log(`acc: ${acc} input: ${input}`);
    let polarity = undefined;
    let hasSkipped = false;
    let secondProblem = false;

    while (!secondProblem && input.length > 0) {
      // While we have input
      const curr = acc[acc.length - 1];
      const next = JSON.parse(JSON.stringify(input[0]));
      console.log(acc);

      if (acc.length == 2) {
        polarity = Math.sign(acc[0] - acc[1]);
      }

      const legal = isNextLegal(curr, next);
      console.log(`legal: ${legal}, curr: ${curr}, next: ${next}`);

      if (legal) {
        if (polarity == undefined) {
          acc = JSON.parse(JSON.stringify([...acc, next]));
        }
        if (polarity != undefined) {
          // We've established polarity from having at least two numbers
          const incomingPolarityCheck = polarity == Math.sign(acc[acc.length - 1] - next);

          if (incomingPolarityCheck) {
            // Passing number, so allow it through
            acc = JSON.parse(JSON.stringify([...acc, next]));
            input.shift(1);
          } else if (!incomingPolarityCheck && !hasSkipped) {
            // First time removing, so remove it
            input.shift(1);
            hasSkipped = true;
          } else {
            // Ok there's a second problem now, so lets stop
            secondProblem = true;
          }
        }
      } else if (!legal && !hasSkipped) {
        // First time removing, so remove it
        input.shift(1);
      } else {
        secondProblem = true;
      }
    }

    return acc;
  });

  console.log(attempt3);
});

// x
// // (x + 1, x + 2, x + 3 x - 1, x - 2, x - 3

// [1] [1, 3, 1]
// [1, 3] [1]

// [1] [3, 2, 4, 5]
// [1, 3] [2, 4 ,5]
// [1, 3, 4, 5]
