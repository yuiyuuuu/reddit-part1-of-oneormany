const calculateKarma = async (votes) => {
  return Math.round((8.27 * 103 * votes) / (votes + 8.52 * 103));
};

module.exports = { calculateKarma };
