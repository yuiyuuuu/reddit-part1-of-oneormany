const router = require("express").Router();
const prisma = require("../prismaClient.js");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        communities: true,
        posts: true,
      },
    });
    res.send(users);
  } catch (error) {
    next(error);
  }
});
