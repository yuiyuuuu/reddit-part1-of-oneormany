const router = require("express").Router();
const prisma = require("../prismaClient.js");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const communities = await prisma.community.findMany({
      include: {
        users: true,
        posts: true,
      },
    });
    res.send(communities);
  } catch (error) {
    next(error);
  }
});
