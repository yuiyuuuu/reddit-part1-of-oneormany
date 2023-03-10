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
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});

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
        downvotes: [...new Set([...post.upvotes, req.body.userid])],
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
      },
    });

    res.send(final);
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
        downvotes: post.upvotes.filter((i) => i !== req.body.userid),
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
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});

router.put("/comment/upvote", async (req, res, next) => {
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

router.put("/comment/downvote", async (req, res, next) => {
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
        downvotes: [...new Set([...comment.downvotes, req.body.userid])],
        upvotes: comment.upvotes.filter((i) => i !== req.body.userid),
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

router.put("/comment/upvote/remove", async (req, res, next) => {
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
        upvotes: comment.upvotes.filter((i) => i !== req.body.userid),
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

router.put("/comment/downvote/remove", async (req, res, next) => {
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

router.post("/comment/add", async (req, res, next) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        userId: req.body.userId,
        postId: req.body.postId,
        parentId: req.body.parentId,
        message: req.body.message,
      },
      include: {
        user: true,
      },
    });

    const post = await prisma.post.findUnique({
      where: {
        id: req.body.postId,
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
        },
      },
    });

    res.send({ post: post, comment: comment });
  } catch (error) {
    next(error);
  }
});

//NEW COMMENTS
//these functions return the comment rather than the post

router.put("/comment/upvote/new", async (req, res, next) => {
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

router.put("/comment/downvote/new", async (req, res, next) => {
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
        downvotes: [...new Set([...comment.downvotes, req.body.userid])],
        upvotes: comment.upvotes.filter((i) => i !== req.body.userid),
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

router.put("/comment/upvote/remove/new", async (req, res, next) => {
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
        upvotes: comment.upvotes.filter((i) => i !== req.body.userid),
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

router.put("/comment/downvote/remove/new", async (req, res, next) => {
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
