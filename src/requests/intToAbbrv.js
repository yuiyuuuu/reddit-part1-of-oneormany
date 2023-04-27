const intToAbbrv = (arg) => {
  const result = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(arg);

  return result;
};

export { intToAbbrv };
