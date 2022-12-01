const router = require("express").Router();
const prisma = require("../prismaClient.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = router;

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const encrypt = await bcrypt.hash(password, 10); //encrypt pass here
    const user = await prisma.user.create({
      data: {
        email: email,
        name: username,
        password: encrypt,
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
      name: username,
    },
  });

  if (!user) {
    res.status(400).send("notfound");
    return;
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      console.log("user", user);
      console.log("bcrypt", await bcrypt.compare(password, user.password));
      res.send(user).status(200);
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
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
});
