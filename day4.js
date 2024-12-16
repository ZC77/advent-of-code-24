const fs = require("fs");

fs.readFile("./day4_input.txt", "utf8", (err, data) => {
  const WIDTH = 139; // Max array index - Width AND Height of array.
  const horizontalRegex = /(XMAS)|(SAMX)/g;

  const cells = data
    .split("\r\n")
    .map((val) => val.split(""))
    .flat();

  const horizontalCount = data
    .split("\r\n")
    .map((val) => val.match(horizontalRegex))
    .flat()
    .filter((val) => val !== null && val !== undefined);

  let verticalCount;

  for (x = 0; x < WIDTH; x++) {
    let verticalString = "";
    for (y = 0; y < WIDTH; y++) {
      verticalString += cells[y * 140];
    }
    const count = verticalString.match(horizontalRegex).flat();
    console.log(verticalString);
  }

  console.log(horizontalCount.length);
});
