const router = require("express").Router();
const prisma = require("../prismaClient.js");

const {
  calculateKarma,
} = require("../../src/requests/karma/karmaFunctions.js");

module.exports = router;

// api/posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
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
        upvotes: true,
        downvotes: true,
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
    });

    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.put("/vote", async (req, res, next) => {
  try {
    //add the user to the upvotes and make sure there are no duplicates
    const which = req.body.which;

    const a = await prisma.post.findUnique({
      where: {
        id: req.body.postid,
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
            upvotes: true,
            downvotes: true,
          },
        },

        upvotes: true,
        downvotes: true,
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
        postKarma: postUser.postKarma - previousKarma + currentKarma,
      },
    });

    res.send({ final: final, userdata: req.body.userid });
  } catch (error) {
    next(error);
  }
});

// //add downvote
// router.put("/downvote", async (req, res, next) => {
//   try {
//     //find post
//     const post = await prisma.post.findUnique({
//       where: {
//         id: req.body.postid,
//       },
//     });

//     //add the user to the upvotes and make sure there are no duplicates
//     const final = await prisma.post.update({
//       where: {
//         id: req.body.postid,
//       },
//       data: {
//         upvotes: post.upvotes.filter((i) => i !== req.body.userid),
//         downvotes: [...new Set([...post.downvotes, req.body.userid])],
//       },
//       include: {
//         user: true,
//         community: {
//           include: {
//             users: true,
//           },
//         },
//         comments: {
//           include: {
//             user: true,
//           },
//         },
//       },
//     });

//     res.send({ final: final, userdata: req.body.userid });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/upvote/remove", async (req, res, next) => {
//   try {
//     const post = await prisma.post.findUnique({
//       where: {
//         id: req.body.postid,
//       },
//     });

//     const final = await prisma.post.update({
//       where: {
//         id: req.body.postid,
//       },
//       data: {
//         upvotes: post.upvotes.filter((i) => i !== req.body.userid),
//       },
//       include: {
//         user: true,
//         community: {
//           include: {
//             users: true,
//           },
//         },
//         comments: {
//           include: {
//             user: true,
//           },
//         },
//       },
//     });

//     res.send(final);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/downvote/remove", async (req, res, next) => {
//   try {
//     const post = await prisma.post.findUnique({
//       where: {
//         id: req.body.postid,
//       },
//     });

//     const final = await prisma.post.update({
//       where: {
//         id: req.body.postid,
//       },
//       data: {
//         downvotes: post.downvotes.filter((i) => i !== req.body.userid),
//       },
//       include: {
//         user: true,
//         community: {
//           include: {
//             users: true,
//           },
//         },
//         comments: {
//           include: {
//             user: true,
//           },
//         },
//       },
//     });

//     res.send(final);
//   } catch (error) {
//     next(error);
//   }
// });
