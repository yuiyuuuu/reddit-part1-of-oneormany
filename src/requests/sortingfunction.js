function parseDate(date) {
  const d = Date.parse(date);
  return d;
}

function sorting(a, b) {
  const aDate = parseDate(a.createdAt);
  const bDate = parseDate(b.createdAt);

  if (aDate < bDate) return 1;
  if (aDate > bDate) return -1;
  return;
}

//comment sorting fuctions

function sortCommentsByTop(a, b) {
  if (
    a.upvotes.length - a.downvotes.length >
    b.upvotes.length - b.downvotes.length
  ) {
    return -1;
  } else if (
    a.upvotes.length - a.downvotes.length <
    b.upvotes.length - b.downvotes.length
  ) {
    return 1;
  } else {
    //if votes are the same return by time created
    const aDate = parseDate(a.createdAt);
    const bDate = parseDate(b.createdAt);

    if (aDate < bDate) return 1;
    if (aDate > bDate) return -1;
    return 0;
  }
}

function sortCommentsByBest(a, b) {}

function sortCommentsByControversial(a, b) {
  if (
    a.upvotes.length + a.downvotes.length >
    b.upvotes.length + b.downvotes.length
  ) {
    return -1;
  } else if (
    a.upvotes.length + a.downvotes.length <
    b.upvotes.length + b.downvotes.length
  ) {
    return 1;
  } else {
    return 0;
  }
}

function sortByPercentage(a, b) {
  const percentageUpvotesA =
    a.upvotes.length / (a.upvotes.length + a.downvotes.length) || 0;
  const percentageUpvotesB =
    b.upvotes.length / (b.upvotes.length + b.downvotes.length) || 0;

  if (percentageUpvotesA > percentageUpvotesB) {
    return -1;
  } else if (percentageUpvotesA < percentageUpvotesB) {
    return 1;
  } else {
    //if votes are the same return by time created

    const aDate = parseDate(a.createdAt);
    const bDate = parseDate(b.createdAt);

    if (aDate < bDate) return 1;
    if (aDate > bDate) return -1;
    return 0;
  }
}

function sortCommentsByOld(a, b) {
  const aDate = parseDate(a.createdAt);
  const bDate = parseDate(b.createdAt);

  if (aDate > bDate) return 1;
  if (aDate < bDate) return -1;
  return 0;
}

export {
  sorting,
  sortCommentsByTop,
  sortCommentsByBest,
  sortCommentsByControversial,
  sortCommentsByOld,
  sortByPercentage,
};
