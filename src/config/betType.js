export const betType = (type) => {
  switch (type) {
    case "1x2":
      return 1;
    case "Handicap":
      return 2;
    case "Handicap Half":
      return 3;
    case "Total":
      return 4;
    default:
      return 0;
  }
};
