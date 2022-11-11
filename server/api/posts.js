const router = require("express").Router();
const prisma = require("../prismaClient.js");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    console.log(prisma.post);
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    res.send(posts);
  } catch (error) {
    next(error);
  }
});
