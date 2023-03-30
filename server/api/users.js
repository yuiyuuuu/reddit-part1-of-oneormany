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

router.get("/find/:name", async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: {
          equals: req.params.name,
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      res.send("available");
    } else {
      res.send("not available");
    }
  } catch (error) {
    next(error);
    return "error";
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: {
          equals: req.params.name,
          mode: "insensitive",
        },
      },

      include: {
        posts: {
          include: {
            user: true,
            community: {
              include: {
                users: true,
              },
            },
            comments: {
              include: {
                user: true,
              },
            },
          },
        },
        comments: {
          include: {
            post: true,
            children: true,
            parent: true,
            user: true,
          },
        },
        communities: true,
        communityOwner: true,
        moderatorCommunities: true,
        favoriteCommunities: true,
      },
    });

    if (!user) {
      res.send("does not exist");
    }

    res.send(user);
  } catch (error) {
    next(error);
    return "error";
  }
});
