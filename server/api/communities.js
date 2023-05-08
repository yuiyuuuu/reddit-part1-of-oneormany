const router = require("express").Router();
const prisma = require("../prismaClient.js");

const {
  calculateKarma,
} = require("../../src/requests/karma/karmaFunctions.js");

module.exports = router;

router.get("/fetchbyid/:id", async (req, res, next) => {
  try {
    const community = await prisma.community.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        posts: {
          include: {
            comments: {
              include: {
                user: true,
                downvotes: true,
                upvotes: true,
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
                downvotes: true,
                upvotes: true,
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
        posts: {
          include: {
            comments: {
              include: {
                user: true,
                downvotes: true,
                upvotes: true,
              },
            },
          },
        },
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
                downvotes: true,
                upvotes: true,
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
                downvotes: true,
                upvotes: true,
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
              include: {
                user: true,
                downvotes: true,
                upvotes: true,
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
                downvotes: true,
                upvotes: true,
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
                downvotes: true,
                upvotes: true,
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
                downvotes: true,
                upvotes: true,
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
    const a = await prisma.post.findUnique({
      where: {
        id: req.body.postid,
      },
      include: {
        upvotes: true,
        downvotes: true,
      },
    });
    const previousKarma = await calculateKarma(
      a.upvotes.length - a.downvotes.length
    );

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
            downvotes: true,
            upvotes: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        downvotes: true,
        upvotes: true,
      },
    });

    //update karma
    const findPost = await prisma.post.findUnique({
      where: {
        id: req.body.postid,
      },
      include: {
        upvotes: true,
        downvotes: true,
        user: true,
      },
    });

    const currentKarma = await calculateKarma(
      findPost.upvotes.length - findPost.downvotes.length
    );

    //find user so we can get karma, that way we can add on the difference
    const postUser = await prisma.user.findUnique({
      where: {
        id: findPost.user.id,
      },
    });

    //update the user by adding on the difference onto the total karma of the user
    await prisma.user.update({
      where: {
        id: findPost.user.id,
      },
      data: {
        postKarma: postUser.postKarma + currentKarma - previousKarma,
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});

router.put("/comment/vote", async (req, res, next) => {
  try {
    const which = req.body.which;

    const a = await prisma.comment.findUnique({
      where: {
        id: req.body.commentid,
      },
      include: {
        upvotes: true,
        downvotes: true,
      },
    });

    //we need this previous karma so we can subtract it later and find the difference
    const previousKarma = await calculateKarma(
      a.upvotes.length - a.downvotes.length
    );

    if (which === "up") {
      await prisma.comment.update({
        where: {
          id: req.body.commentid,
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
      await prisma.comment.update({
        where: {
          id: req.body.commentid,
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
      await prisma.comment.update({
        where: {
          id: req.body.commentid,
        },
        data: {
          downvotes: {
            disconnect: [{ id: req.body.userid }],
          },
        },
      });
    } else {
      await prisma.comment.update({
        where: {
          id: req.body.commentid,
        },
        data: {
          upvotes: {
            disconnect: [{ id: req.body.userid }],
          },
        },
      });
    }

    const final = await prisma.comment.findUnique({
      where: {
        id: req.body.commentid,
      },
      include: {
        upvotes: true,
        user: true,
        downvotes: true,
      },
    });

    //update karma
    const currentKarma = await calculateKarma(
      final.upvotes.length - final.downvotes.length
    );

    //find user so we can get karma, that way we can add on the difference
    const commentUser = await prisma.user.findUnique({
      where: {
        id: final.user.id,
      },
    });

    //update the user by adding on the difference onto the total karma of the user
    await prisma.user.update({
      where: {
        id: commentUser.id,
      },
      data: {
        commentKarma: commentUser.commentKarma + currentKarma - previousKarma,
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
    const which = req.body.which;

    const a = await prisma.comment.findUnique({
      where: {
        id: req.body.commentid,
      },
      include: {
        upvotes: true,
        downvotes: true,
      },
    });

    //we need this previous karma so we can subtract it later and find the difference
    const previousKarma = await calculateKarma(
      a.upvotes.length - a.downvotes.length
    );

    if (which === "up") {
      await prisma.comment.update({
        where: {
          id: req.body.commentid,
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
      await prisma.comment.update({
        where: {
          id: req.body.commentid,
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
      await prisma.comment.update({
        where: {
          id: req.body.commentid,
        },
        data: {
          downvotes: {
            disconnect: [{ id: req.body.userid }],
          },
        },
      });
    } else {
      await prisma.comment.update({
        where: {
          id: req.body.commentid,
        },
        data: {
          upvotes: {
            disconnect: [{ id: req.body.userid }],
          },
        },
      });
    }

    const final = await prisma.comment.findUnique({
      where: {
        id: req.body.commentid,
      },

      include: {
        user: true,
        downvotes: true,
        upvotes: true,
      },
    });

    //update karma
    const currentKarma = await calculateKarma(
      final.upvotes.length - final.downvotes.length
    );

    //find user so we can get karma, that way we can add on the difference
    const commentUser = await prisma.user.findUnique({
      where: {
        id: final.user.id,
      },
    });

    //update the user by adding on the difference onto the total karma of the user
    await prisma.user.update({
      where: {
        id: commentUser.id,
      },
      data: {
        commentKarma: commentUser.commentKarma + currentKarma - previousKarma,
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
        downvotes: true,
        upvotes: true,
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
            upvotes: true,
            downvotes: true,
          },
        },
        upvotes: true,
        downvotes: true,
      },
    });

    res.send({ post: post, comment: comment });
  } catch (error) {
    next(error);
  }
});
