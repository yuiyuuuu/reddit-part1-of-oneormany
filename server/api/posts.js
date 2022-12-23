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

router.get("/community/:id", async (req, res, next) => {
  try {
    const community = await prisma.community.findFirst({
      where: {
        tag: "r/" + req.params.id,
      },
      include: {
        posts: {
          include: {
            user: true,
            comments: true,
            community: true,
          },
        },
      },
    });
    if (!community.posts.length) {
      res.send("no posts");
    }
    res.send(community.posts);
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

//add upvote
router.put("/upvote", async (req, res, next) => {
  try {
    //find post
    const post = await prisma.post.findUnique({
      where: {
        id: req.body.postid,
      },
    });

    //add the user to the upvotes and make sure there are no duplicates
    const final = await prisma.post.update({
      where: {
        id: req.body.postid,
      },
      data: {
        upvotes: [...new Set([...post.upvotes, req.body.userid])],
        downvotes: post.downvotes.filter((i) => i !== req.body.userid),
      },
      include: {
        user: true,
        community: true,
        comments: true,
      },
    });

    res.send({ final: final, userdata: req.body.userid });
  } catch (error) {
    next(error);
  }
});

//add downvote
router.put("/downvote", async (req, res, next) => {
  try {
    //find post
    const post = await prisma.post.findUnique({
      where: {
        id: req.body.postid,
      },
    });

    //add the user to the upvotes and make sure there are no duplicates
    const final = await prisma.post.update({
      where: {
        id: req.body.postid,
      },
      data: {
        upvotes: post.upvotes.filter((i) => i !== req.body.userid),
        downvotes: [...new Set([...post.downvotes, req.body.userid])],
      },
      include: {
        user: true,
        community: true,
        comments: true,
      },
    });

    res.send({ final: final, userdata: req.body.userid });
  } catch (error) {
    next(error);
  }
});

router.put("/upvote/remove", async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.body.postid,
      },
    });

    const final = await prisma.post.update({
      where: {
        id: req.body.postid,
      },
      data: {
        upvotes: post.upvotes.filter((i) => i !== req.body.userid),
      },
      include: {
        user: true,
        community: true,
        comments: true,
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});

router.put("/downvote/remove", async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.body.postid,
      },
    });

    const final = await prisma.post.update({
      where: {
        id: req.body.postid,
      },
      data: {
        downvotes: post.downvotes.filter((i) => i !== req.body.userid),
      },
      include: {
        user: true,
        community: true,
        comments: true,
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});
