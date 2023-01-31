const router = require("express").Router();
const prisma = require("../prismaClient.js");

module.exports = router;

router.get("/single/:id", async (req, res, next) => {
  try {
    const community = await prisma.community.findFirst({
      where: {
        tag: `r/${req.params.id}`,
      },
      include: {
        posts: {
          include: {
            comments: true,
            user: true,
            community: true,
          },
        },
        users: {
          select: {
            name: true,
            id: true,
            photo: true,
            password: false,
          },
        },
      },
    });
    if (!community) {
      res.send("not found");
    } else {
      res.send(community);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const communities = await prisma.community.findMany({
      include: {
        users: {
          select: {
            name: true,
            id: true,
            photo: true,
            password: false,
          },
        },
        posts: true,
      },
    });
    res.send(communities);
  } catch (error) {
    next(error);
  }
});

router.put("/join", async (req, res, next) => {
  try {
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: req.body.userid,
    //   },
    //   include: {
    //     communities: true,
    //   },
    // });

    await prisma.user.update({
      where: {
        id: req.body.userid,
      },
      data: {
        communities: {
          connect: [{ id: req.body.communityid }],
        },
      },

      include: {
        communities: true,
        posts: true,
      },
    });

    const community = await prisma.community.findUnique({
      where: {
        id: req.body.communityid,
      },
      include: {
        posts: {
          include: {
            comments: true,
            user: true,
            community: true,
          },
        },
        users: {
          select: {
            name: true,
            id: true,
            photo: true,
            password: false,
          },
        },
      },
    });

    res.send(community);
  } catch (error) {
    next(error);
  }
});

router.put("/leave", async (req, res, next) => {
  try {
    await prisma.user.update({
      where: {
        id: req.body.userid,
      },

      data: {
        communities: {
          disconnect: [{ id: req.body.communityid }],
        },
      },
    });

    const community = await prisma.community.findUnique({
      where: {
        id: req.body.communityid,
      },
      include: {
        posts: {
          include: {
            comments: true,
            user: true,
            community: true,
          },
        },
        users: {
          select: {
            name: true,
            id: true,
            photo: true,
            password: false,
          },
        },
      },
    });

    res.send(community);
  } catch (error) {
    next(error);
  }
});

router.put("/stylingchange", async (req, res, next) => {
  try {
    const community = await prisma.community.findUnique({
      where: {
        id: req.body.id,
      },
    });

    const update = await prisma.community.update({
      where: {
        id: req.body.id,
      },
      data: {
        themeBaseColor: req.body?.base || community.themeBaseColor,
        themeHighlightColor:
          req.body?.highlight || community.themeHighlightColor,
        themeBodyColor: req.body?.body || community.themeBodyColor,
        image: req.body.image,
      },
    });

    res.send(update);
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const findCommunity = await prisma.community.findFirst({
      where: {
        name: {
          mode: "insensitive",
          equals: req.body.name,
        },
      },
    });

    if (findCommunity) {
      res.send("exists");
      return;
    }

    const community = await prisma.community.create({
      data: req.body,
    });

    res.send(community);
  } catch (error) {
    next(error);
  }
});

router.put("/description", async (req, res, next) => {
  try {
    const update = await prisma.community.update({
      where: {
        id: req.body.id,
      },
      data: {
        description: req.body.description,
      },
    });

    res.send(update);
  } catch (error) {
    next(error);
  }
});
