const fs = require("fs");

// fs.readFile("./day2_edge.txt", "utf8", (err, data) => {
// fs.readFile("./day2_input.txt", "utf8", (err, data) => {
fs.readFile("./message.txt", "utf8", (err, data) => {
  const splitData = data.split("\n");
  // const splitData = data.split("\r\n"); // WINDOWS

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
  /** NOT WORKING */
  // Same rules apply as before, but we can remove a single datapoint to make it compliant.

  const getDifference = (val1, val2) => {
    const difference = Math.abs(val1 - val2);
    return { legal: difference >= 1 && difference <= 3, value: val1 - val2 };
  };

  const hasSameSign = (val1, val2) => {
    return Math.sign(val1) == Math.sign(val2);
  };

  const part2algo2 = arrayified.map((arr, idxMain) => {
    // Sliding window with +1 lookahead
    // Same algo as before, compared curr with next to check polarity and difference are within bounds
    // Establish a flag to track that a value has been removed
    // If a value is illegal, extend window to check next value
    // Check difference between those two, if defined and OK

    let hasRemoved = false;
    let removeNext = false;
    let polarity;

    const processed = arr.map((val, idx, thisArray) => {
      if (hasRemoved && removeNext) {
        removeNext = false;
        return undefined;
      }
      if (idx == 0) {
        // first comparison - special case
        // we take 3 polarity checks to determine the overall polarity
        const polarity1 = Math.sign(val - thisArray[1]);
        const polarity2 = Math.sign(thisArray[1] - thisArray[2]);
        const polarity3 = Math.sign(thisArray[2] - thisArray[3]);

        polarity = [polarity1, polarity2, polarity3].reduce((acc, curr) => acc + curr, 0);
      }

      // Begin regular checks
      const hasNext = idx < thisArray.length - 1;

      if (hasNext) {
        const next = thisArray[idx + 1];
        const { legal: isLegalDifference } = getDifference(val, next);
        const currentPolarity = Math.sign(val - next);
        const isLegalPolarity = currentPolarity == Math.sign(polarity);
        const isLegal = isLegalDifference && isLegalPolarity;

        if (isLegal) {
          return val;
        } else if (!isLegal) {
          if (!hasRemoved) {
            console.log(`issues with ${val} and ${next}`);
            // Attempt to remove this number
            // First - can we fix by removing adjacent values?
            if (!isLegalDifference) {
              // A non-legal adjacent difference - try skip values
              const before = thisArray[idx - 1];
              const skipPolarity = Math.sign(before - next);
              const { legal: isSkipDifferenceLegal } = getDifference(before, next);
              const isSkipPolarityLegal = skipPolarity == Math.sign(polarity);

              if (isSkipDifferenceLegal) {
              }
            } else {
              // Legal adjacent difference - try removing the one with bad polarity
            }
          }
          return false;
        }
      }
    });

    return processed;
  });

  const final = part2algo2.map((val) => !val.includes(false)).reduce((acc, curr) => (acc += curr ? 1 : 0), 0);
  console.log(part2algo2);
  console.log(final);
});
