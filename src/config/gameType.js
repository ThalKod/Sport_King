export const gameType = (type) => {
  switch (type) {
    case "football":
      return 1;
    case "basketball":
      return 2;
    default:
      return 0;
  }
};
