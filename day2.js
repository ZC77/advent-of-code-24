const fs = require("fs");

fs.readFile("./day2_input.txt", "utf8", (err, data) => {
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
  console.log(numOfSafeReports);

  /** PART 2 */
  // Same rules apply as before, but we can remove a single datapoint to make it compliant.

  //

  const part2 = arrayified.map((arr) => {
    const initial = arr
      .map((val, idx, thisArray) => {
        const hasNext = idx < thisArray.length - 1;
        if (hasNext) {
          const next = thisArray[idx + 1];
          const difference = val - next;
          return difference;
        }
        return undefined; // last value has nothing to compare to
      })
      .slice(0, -1);

    let hasRemoved = false;

    initial.map((val, idx, thisArray) => {
      const withinRange = Math.abs(val) >= 1 && Math.abs(val) <= 3;
      if (!withinRange && !hasRemoved) {
        hasRemoved = true;
        return undefined;
      }
    });
  });
});
