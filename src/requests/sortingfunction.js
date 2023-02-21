function parseDate(date) {
  const d = Date.parse(date);
  return d;
}

function sorting(a, b) {
  console.log(a.createdAt);
  console.log(b.createdAt);
  const aDate = parseDate(a.createdAt);
  const bDate = parseDate(b.createdAt);

  if (aDate < bDate) return 1;
  if (aDate > bDate) return -1;
  return;
}

export { sorting };
