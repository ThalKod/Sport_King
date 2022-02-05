export const roundDecimals = (number) => {// TODO: refactor that functions....
  const decimal = (number % 1).toFixed(2);
  let newDecimal = number;

  if(decimal === "0.25" || decimal === "0.75"){
    newDecimal = parseFloat(newDecimal) + 0.25;
    return newDecimal;
  }

  if(decimal === "-0.75" || decimal === "-0.25"){
    newDecimal = parseFloat(newDecimal) - 0.25;
    return newDecimal
  }

  return newDecimal;
};
