const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function hash(v) {
  const a = await bcrypt.hash(v, 10);

  return a;
}

async function seed() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.community.deleteMany();

  const jack = await prisma.user.create({
    data: {
      name: "Jack",
      email: "jack@gmail.com",
      password: await bcrypt.hash("1234567890", 10),
    },
  });

  const rachel = await prisma.user.create({
    data: {
      name: "rachel",
      email: "rachel@gmail.com",
      password: await bcrypt.hash("1234567890", 10),
    },
  });

  await jwt.sign({ id: jack.id }, process.env.JWT);
  await jwt.sign({ id: rachel.id }, process.env.JWT);

  const community1 = await prisma.community.create({
    data: {
      name: "Steam",
      tag: "r/Steam",
      rules: "please follow these rules",
      users: {
        create: [{ name: "hi", email: "hi@gmail.com", password: "123" }],
      },
      image: "",
      description: "this is steam on reddit",
      createAt: new Date(),
      ownerId: jack.id,
    },
  });

  const post1 = await prisma.post.create({
    data: {
      title: "First Post",
      body: "Was it a whisper or was it the wind? He wasn't quite sure. He thought he heard a voice but at this moment all he could hear was the wind rustling the leaves of the trees all around him. He stopped and listened more intently to see if he could hear the voice again. Nothing but the wind rustling the leaves could be heard. He was about to continue his walk when he felt a hand on his shoulder, and he quickly turned to see who it was. There was nobody there, but he heard the voice again.",
      upvotes: [jack.id],
      downvotes: [rachel.id],
      communityId: community1.id,
      userId: jack.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Second Post",
      body: "Green vines attached to the trunk of the tree had wound themselves toward the top of the canopy. Ants used the vine as their private highway, avoiding all the creases and crags of the bark, to freely move at top speed from top to bottom or bottom to top depending on their current chore. At least this was the way it was supposed to be. Something had damaged the vine overnight halfway up the tree leaving a gap in the once pristine ant highway.",
      communityId: community1.id,
      userId: jack.id,
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      userId: jack.id,
      postId: post1.id,
      message: "How Inspiring!",
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      userId: rachel.id,
      parentId: comment1.id,
      postId: post1.id,
      message: "I am a nested comment",
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      userId: rachel.id,
      postId: post1.id,
      message: "I am a root comment",
    },
  });

  const comment2Child = await prisma.comment.create({
    data: {
      userId: rachel.id,
      postId: post1.id,
      parentId: comment2.id,
      message: "I am a nested comment",
    },
  });

  const comment2Child2 = await prisma.comment.create({
    data: {
      userId: rachel.id,
      postId: post1.id,
      parentId: comment2Child.id,
      message: "I am a nested comment",
    },
  });

  await prisma.comment.create({
    data: {
      userId: rachel.id,
      postId: post1.id,
      parentId: comment3.id,
      message: "I am a nested comment",
    },
  });
}

try {
  console.log(hash("123"));
  seed();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  console.log("closing db connection");
  console.log("db connection closed");
}
