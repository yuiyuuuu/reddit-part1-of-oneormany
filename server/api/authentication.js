const router = require("express").Router();
const prisma = require("../prismaClient.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = router;

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const findUser = await prisma.user.findFirst({
      where: {
        name: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (findUser) {
      res.send("username-exists").status(401);
    }

    const findByEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (findByEmail) {
      res.send("email-exists").status(401);
    }

    const encrypt = await bcrypt.hash(password, 10); //encrypt pass here
    const user = await prisma.user.create({
      data: {
        email: email,
        name: username,
        password: encrypt,
      },
      include: {
        communities: {
          include: {
            users: true,
          },
        },
        posts: true,
        comments: true,
        communityOwner: true,
        moderatorCommunities: true,
        favoriteCommunities: true,
      },
    });

    res.send({
      user,
      jwt: jwt.sign({ id: user.id }, process.env.JWT),
    });
  } catch (error) {
    res.send("error").status(500);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      name: {
        mode: "insensitive", //username not case sensitive
        equals: username,
      },
    },
    include: {
      communities: {
        include: {
          users: true,
        },
      },
      posts: true,
      comments: true,
      communityOwner: true,
      moderatorCommunities: true,
      favoriteCommunities: true,
    },
  });

  if (!user) {
    res.send("notfound").status(401);
    return;
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      res
        .send({
          user: user,
          jwt: jwt.sign({ id: user.id }, process.env.JWT),
        })
        .status(200);
    } else {
      res.send("wrongpassword").status(401);
      return;
    }
  } catch (error) {
    next(error);
  }
});

router.get("/getlocaldata", async (req, res, next) => {
  try {
    const { id } = await jwt.verify(req.headers.authorization, process.env.JWT);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },

      include: {
        communities: {
          include: {
            users: true,
          },
        },
        posts: true,
        comments: true,
        communityOwner: true,
        moderatorCommunities: true,
        favoriteCommunities: true,
      },
    });

    res.send(user);
  } catch (error) {
    res.send({});
    next(error);
  }
});

router.put("/favorite/add", async (req, res, next) => {
  try {
    const final = await prisma.user.update({
      where: {
        id: req.body.userid,
      },

      data: {
        favoriteCommunities: {
          connect: [{ id: req.body.communityid }],
        },
      },

      include: {
        communities: {
          include: {
            users: true,
          },
        },
        posts: true,
        comments: true,
        communityOwner: true,
        moderatorCommunities: true,
        favoriteCommunities: true,
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});

router.put("/favorite/remove", async (req, res, next) => {
  try {
    const final = await prisma.user.update({
      where: {
        id: req.body.userid,
      },

      data: {
        favoriteCommunities: {
          disconnect: [{ id: req.body.communityid }],
        },
      },

      include: {
        communities: {
          include: {
            users: true,
          },
        },
        posts: true,
        comments: true,
        communityOwner: true,
        moderatorCommunities: true,
        favoriteCommunities: true,
      },
    });

    res.send(final);
  } catch (error) {
    next(error);
  }
});
