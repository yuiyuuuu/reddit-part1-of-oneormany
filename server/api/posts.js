const router = require("express").Router();
const prisma = require("../prismaClient.js");

module.exports = router;
// api/posts

router.get("/", async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        community: true,
        comments: true,
      },
    });

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await prisma.post.create({
      data: req.body,
    });

    res.send(data);
  } catch (error) {
    next(error);
  }
});
