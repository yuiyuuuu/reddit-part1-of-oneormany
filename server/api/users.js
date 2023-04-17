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
                downvotes: true,
                upvotes: true,
              },
            },
            downvotes: true,
            upvotes: true,
          },
        },
        comments: {
          include: {
            post: {
              include: {
                user: true,
                comments: {
                  include: {
                    user: true,
                    downvotes: true,
                    upvotes: true,
                  },
                },
                community: {
                  include: {
                    users: true,
                  },
                },
                downvotes: true,
                upvotes: true,
              },
            },
            children: true,
            parent: true,
            user: true,
            upvotes: true,
            downvotes: true,
          },
        },
        communities: {
          include: {
            users: true,
          },
        },
        communityOwner: {
          include: {
            users: true,
          },
        },
        moderatorCommunities: {
          include: {
            users: true,
          },
        },
        favoriteCommunities: {
          include: {
            users: true,
          },
        },
        followedBy: true,
        following: true,
        history: {
          include: {
            user: true,
            comments: {
              include: {
                user: true,
                upvotes: true,
                downvotes: true,
              },
            },
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
          },
        },
        savedComments: true,
        savedPosts: {
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
            },

            downvotes: true,
            upvotes: true,
          },
        },
        hiddenPosts: {
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
            },

            downvotes: true,
            upvotes: true,
          },
        },
        upvotes: {
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
            },

            downvotes: true,
            upvotes: true,
          },
        },
        downvotes: {
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
            },

            downvotes: true,
            upvotes: true,
          },
        },
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

router.put("/join/community", async (req, res, next) => {
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
    });

    const final = await prisma.user.findUnique({
      where: {
        id: req.body.selected,
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
            downvotes: true,
            upvotes: true,
          },
        },
        comments: {
          include: {
            post: {
              include: {
                user: true,
                comments: {
                  include: {
                    user: true,
                  },
                },
                community: {
                  include: {
                    users: true,
                  },
                },
              },
            },
            children: true,
            parent: true,
            user: true,
          },
        },
        communities: {
          include: {
            users: true,
          },
        },
        communityOwner: {
          include: {
            users: true,
          },
        },
        moderatorCommunities: {
          include: {
            users: true,
          },
        },
        favoriteCommunities: {
          include: {
            users: true,
          },
        },
        history: {
          include: {
            user: true,
            comments: {
              include: {
                user: true,
              },
            },
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
          },
        },
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});

router.put("/leave/community", async (req, res, next) => {
  try {
    const final = await prisma.user.update({
      where: {
        id: req.body.userid,
      },
      data: {
        communities: {
          disconnect: [{ id: req.body.communityid }],
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
            downvotes: true,
            upvotes: true,
          },
        },
        comments: {
          include: {
            post: {
              include: {
                user: true,
                comments: {
                  include: {
                    user: true,
                  },
                },
                community: {
                  include: {
                    users: true,
                  },
                },
              },
            },
            children: true,
            parent: true,
            user: true,
          },
        },
        communities: {
          include: {
            users: true,
          },
        },
        communityOwner: {
          include: {
            users: true,
          },
        },
        moderatorCommunities: {
          include: {
            users: true,
          },
        },
        favoriteCommunities: {
          include: {
            users: true,
          },
        },
        history: {
          include: {
            user: true,
            comments: {
              include: {
                user: true,
              },
            },
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
          },
        },
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});

router.put("/follow", async (req, res, next) => {
  try {
    const userFollowing = await prisma.user.update({
      where: {
        id: req.body.userFollowing,
      },
      data: {
        following: {
          connect: [{ id: req.body.userFollowed }],
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
            downvotes: true,
            upvotes: true,
          },
        },
        comments: {
          include: {
            post: {
              include: {
                user: true,
                comments: {
                  include: {
                    user: true,
                  },
                },
                community: {
                  include: {
                    users: true,
                  },
                },
              },
            },
            children: true,
            parent: true,
            user: true,
          },
        },
        communities: {
          include: {
            users: true,
          },
        },
        communityOwner: {
          include: {
            users: true,
          },
        },
        moderatorCommunities: {
          include: {
            users: true,
          },
        },
        favoriteCommunities: {
          include: {
            users: true,
          },
        },
        followedBy: true,
        following: true,
        history: {
          include: {
            user: true,
            comments: {
              include: {
                user: true,
                downvotes: true,
                upvotes: true,
              },
            },
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
          },
        },
      },
    });

    //update the user being followed, but we wont need to send
    await prisma.user.update({
      where: {
        id: req.body.userFollowed,
      },
      data: {
        followedBy: {
          connect: [{ id: req.body.userFollowing }],
        },
      },
    });

    res.send(userFollowing);
  } catch (error) {
    next(error);
  }
});

router.put("/unfollow", async (req, res, next) => {
  try {
    const userFollowing = await prisma.user.update({
      where: {
        id: req.body.userFollowing,
      },
      data: {
        following: {
          disconnect: [{ id: req.body.userFollowed }],
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

            downvotes: true,
            upvotes: true,
          },
        },
        comments: {
          include: {
            post: {
              include: {
                user: true,
                comments: {
                  include: {
                    user: true,
                  },
                },
                community: {
                  include: {
                    users: true,
                  },
                },
              },
            },
            children: true,
            parent: true,
            user: true,
          },
        },
        communities: {
          include: {
            users: true,
          },
        },
        communityOwner: {
          include: {
            users: true,
          },
        },
        moderatorCommunities: {
          include: {
            users: true,
          },
        },
        favoriteCommunities: {
          include: {
            users: true,
          },
        },
        followedBy: true,
        following: true,
        history: {
          include: {
            user: true,
            comments: {
              include: {
                user: true,
              },
            },
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
          },
        },
      },
    });

    //update the user being followed, but we wont need to send
    await prisma.user.update({
      where: {
        id: req.body.userFollowed,
      },
      data: {
        followedBy: {
          disconnect: [{ id: req.body.userFollowing }],
        },
      },
    });

    res.send(userFollowing);
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

    const final = await prisma.user.findUnique({
      where: {
        id: req.body.userid,
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

            downvotes: true,
            upvotes: true,
          },
        },
        comments: {
          include: {
            post: {
              include: {
                user: true,
                comments: {
                  include: {
                    user: true,
                  },
                },
                community: {
                  include: {
                    users: true,
                  },
                },
              },
            },
            children: true,
            parent: true,
            user: true,
          },
        },
        communities: {
          include: {
            users: true,
          },
        },
        communityOwner: {
          include: {
            users: true,
          },
        },
        moderatorCommunities: {
          include: {
            users: true,
          },
        },
        favoriteCommunities: {
          include: {
            users: true,
          },
        },
        followedBy: true,
        following: true,
        history: {
          include: {
            user: true,
            comments: {
              include: {
                user: true,
              },
            },
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
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

router.put("/history", async (req, res, next) => {
  try {
    await prisma.user.update({
      where: {
        id: req.body.userid,
      },
      data: {
        history: {
          connect: [{ id: req.body.postid }],
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/savedstuff", async (req, res, next) => {
  try {
    const which = req.body.addOrRemove;
    const postorcomment = req.body.which;

    if (postorcomment === "post") {
      if (which === "add") {
        await prisma.user.update({
          where: {
            id: req.body.userid,
          },
          data: {
            savedPosts: {
              connect: [{ id: req.body.postid }],
            },
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id: req.body.userid,
          },
          data: {
            savedPosts: {
              disconnect: [{ id: req.body.postid }],
            },
          },
        });
      }
    } else {
      if (which === "add") {
        await prisma.user.update({
          where: {
            id: req.body.userid,
          },
          data: {
            savedComments: {
              connect: [{ id: req.body.postid }],
            },
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id: req.body.userid,
          },
          data: {
            savedComments: {
              disconnect: [{ id: req.body.postid }],
            },
          },
        });
      }
    }

    const find = await prisma.user.findUnique({
      where: {
        id: req.body.userid,
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

            downvotes: true,
            upvotes: true,
          },
        },
        comments: {
          include: {
            post: {
              include: {
                user: true,
                comments: {
                  include: {
                    user: true,
                  },
                },
                community: {
                  include: {
                    users: true,
                  },
                },
              },
            },
            children: true,
            parent: true,
            user: true,
          },
        },
        communities: {
          include: {
            users: true,
          },
        },
        communityOwner: {
          include: {
            users: true,
          },
        },
        moderatorCommunities: {
          include: {
            users: true,
          },
        },
        favoriteCommunities: {
          include: {
            users: true,
          },
        },
        followedBy: true,
        following: true,
        history: {
          include: {
            user: true,
            comments: {
              include: {
                user: true,
              },
            },
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
          },
        },
        downvotes: true,
        upvotes: true,
        savedComments: true,
        savedPosts: {
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
            },

            downvotes: true,
            upvotes: true,
          },
        },
        hiddenPosts: {
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
            },

            downvotes: true,
            upvotes: true,
          },
        },
      },
    });

    res.send(find);
  } catch (error) {
    next(error);
  }
});

router.put("/hidden", async (req, res, next) => {
  try {
    const which = req.body.addOrRemove;

    if (which === "add") {
      await prisma.user.update({
        where: {
          id: req.body.userid,
        },
        data: {
          hiddenPosts: {
            connect: [{ id: req.body.postid }],
          },
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id: req.body.userid,
        },
        data: {
          hiddenPosts: {
            disconnect: [{ id: req.body.postid }],
          },
        },
      });
    }

    const find = await prisma.user.findUnique({
      where: {
        id: req.body.userid,
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

            downvotes: true,
            upvotes: true,
          },
        },
        comments: {
          include: {
            post: {
              include: {
                user: true,
                comments: {
                  include: {
                    user: true,
                  },
                },
                community: {
                  include: {
                    users: true,
                  },
                },
              },
            },
            children: true,
            parent: true,
            user: true,
          },
        },
        communities: {
          include: {
            users: true,
          },
        },
        communityOwner: {
          include: {
            users: true,
          },
        },
        moderatorCommunities: {
          include: {
            users: true,
          },
        },
        favoriteCommunities: {
          include: {
            users: true,
          },
        },
        followedBy: true,
        following: true,
        history: {
          include: {
            user: true,
            comments: {
              include: {
                user: true,
              },
            },
            community: {
              include: {
                users: true,
              },
            },
            upvotes: true,
            downvotes: true,
          },
        },
        downvotes: true,
        upvotes: true,
        savedComments: true,
        savedPosts: {
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
            },

            downvotes: true,
            upvotes: true,
          },
        },
        hiddenPosts: {
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
            },

            downvotes: true,
            upvotes: true,
          },
        },
      },
    });

    res.send(find);
  } catch (error) {
    next(error);
  }
});
