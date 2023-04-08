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
            comments: {
              include: {
                user: true,
              },
              orderBy: {
                id: "asc",
              },
            },
            user: true,
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
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
        owner: true,
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
            comments: {
              orderBy: {
                id: "asc",
              },
              include: {
                user: true,
              },
            },
            user: true,
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
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
        owner: true,
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
            comments: {
              orderBy: {
                id: "asc",
              },
              include: {
                user: true,
              },
            },
            user: true,
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
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
        owner: true,
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
      include: {
        posts: {
          include: {
            comments: {
              orderBy: {
                id: "asc",
              },
            },
            user: true,
            community: {
              include: {
                users: true,
              },
            },
          },

          upvotes: true,
          downvotes: true,
        },
        users: {
          select: {
            name: true,
            id: true,
            photo: true,
            password: false,
          },
        },
        owner: true,
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
      include: {
        owner: true,
      },
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

      include: {
        posts: {
          include: {
            comments: {
              orderBy: {
                id: "asc",
              },
              include: {
                user: true,
              },
            },
            user: true,
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
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
        owner: true,
      },
    });

    res.send(update);
  } catch (error) {
    next(error);
  }
});

router.put("/iconimage", async (req, res, next) => {
  try {
    const update = await prisma.community.update({
      where: {
        id: req.body.id,
      },
      data: {
        iconImage: req.body.image,
        communityNameFormat: req.body.communityNameFormat,
      },

      include: {
        posts: {
          include: {
            comments: {
              orderBy: {
                id: "asc",
              },
              include: {
                user: true,
              },
            },
            user: true,
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
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
        owner: true,
      },
    });

    res.send(update);
  } catch (error) {
    next(error);
  }
});

router.put("/banner", async (req, res, next) => {
  try {
    const update = await prisma.community.update({
      where: {
        id: req.body.id,
      },
      data: {
        bannerImage: req.body.bannerImage,
        bannerColor: req.body.bannerColor,
        communityBannerSize: req.body.communityBannerSize,
      },
      include: {
        posts: {
          include: {
            comments: {
              include: {
                user: true,
              },
              orderBy: {
                id: "asc",
              },
            },
            user: true,
            community: {
              include: {
                users: true,
              },
            },
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
        owner: true,
      },
    });
    res.send(update);
  } catch (error) {
    next(error);
  }
});

router.put("/vote", async (req, res, next) => {
  try {
    const which = req.body.which;

    if (which === "up") {
      await prisma.post.update({
        where: {
          id: req.body.postid,
        },
        data: {
          upvotes: {
            connect: [{ id: req.body.userid }],
          },
          downvotes: {
            disconnect: [{ id: req.body.userid }],
          },
        },
      });
    } else if (which === "down") {
      await prisma.post.update({
        where: {
          id: req.body.postid,
        },
        data: {
          downvotes: {
            connect: [{ id: req.body.userid }],
          },
          upvotes: {
            disconnect: [{ id: req.body.userid }],
          },
        },
      });
    } else if (which === "down-remove") {
      await prisma.post.update({
        where: {
          id: req.body.postid,
        },
        data: {
          downvotes: {
            disconnect: [{ id: req.body.userid }],
          },
        },
      });
    } else {
      await prisma.post.update({
        where: {
          id: req.body.postid,
        },
        data: {
          upvotes: {
            disconnect: [{ id: req.body.userid }],
          },
        },
      });
    }

    //add the user to the upvotes and make sure there are no duplicates
    const final = await prisma.post.findUnique({
      where: {
        id: req.body.postid,
      },
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
          orderBy: {
            id: "asc",
          },
        },
        downvotes: true,
        upvotes: true,
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});

router.put("/comment/vote", async (req, res, next) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: req.body.commentid,
      },
    });

    const final = await prisma.comment.update({
      where: {
        id: req.body.commentid,
      },
      data: {
        upvotes: [...new Set([...comment.upvotes, req.body.userid])],
        downvotes: comment.downvotes.filter((i) => i !== req.body.userid),
      },

      include: {
        user: true,
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});

//NEW COMMENTS
//these functions return the comment rather than the post

router.put("/comment/vote/new", async (req, res, next) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: req.body.commentid,
      },
    });

    const final = await prisma.comment.update({
      where: {
        id: req.body.commentid,
      },
      data: {
        upvotes: [...new Set([...comment.upvotes, req.body.userid])],
        downvotes: comment.downvotes.filter((i) => i !== req.body.userid),
      },
      include: {
        user: true,
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});
