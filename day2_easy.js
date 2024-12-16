const fs = require("fs");

// fs.readFile("./day2_edge.txt", "utf8", (err, data) => {
fs.readFile("./day2_input.txt", "utf8", (err, data) => {
  // fs.readFile("./message.txt", "utf8", (err, data) => {
  // const splitData = data.split("\n");
  const splitData = data.split("\r\n"); // WINDOWS

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

  const getDifference = (val1, val2) => {
    const difference = Math.abs(val1 - val2);
    const polarity = Math.sign(val1 - val2);
    return { legal: difference >= 1 && difference <= 3, polarity };
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

    let polarity;

    const processed = arr.map((val, idx, thisArray) => {
      if (idx == 0) {
        // first comparison - special case
        // we take 3 polarity checks to determine the overall polarity
        const polarity1 = Math.sign(val - thisArray[1]);
        const polarity2 = Math.sign(thisArray[1] - thisArray[2]);
        const polarity3 = Math.sign(thisArray[2] - thisArray[3]);

        polarity = Math.sign(polarity1 + polarity2 + polarity3);
      }

      const removeSelf = [...thisArray].filter((_, filterFnIdx) => filterFnIdx != idx);

      const result = removeSelf.map((val, idx, self) => {
        if (idx == self.length - 1) {
          // last value, it doesn't compare with anything
          return true;
        }
        const { legal, polarity: localPolarity } = getDifference(val, self[idx + 1]);
        return legal && polarity == localPolarity;
      });

      return result.reduce((acc, curr) => acc && curr, true);
    });

    return processed.some((val) => val);
  });

  console.log(part2algo2.reduce((acc, curr) => (curr ? (acc += 1) : (acc += 0)), 0));
});
