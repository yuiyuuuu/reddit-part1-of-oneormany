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

  const user3 = await prisma.user.create({
    data: {
      name: "user3",
      email: "user3@gmail.com",
      password: await bcrypt.hash("1234567890", 10),
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: "user4",
      email: "user4@gmail.com",
      password: await bcrypt.hash("1234567890", 10),
    },
  });

  const user5 = await prisma.user.create({
    data: {
      name: "user5",
      email: "user5@gmail.com",
      password: await bcrypt.hash("1234567890", 10),
    },
  });

  const user6 = await prisma.user.create({
    data: {
      name: "user6",
      email: "user6@gmail.com",
      password: await bcrypt.hash("1234567890", 10),
    },
  });

  const user7 = await prisma.user.create({
    data: {
      name: "user7",
      email: "user7@gmail.com",
      password: await bcrypt.hash("1234567890", 10),
    },
  });

  const user8 = await prisma.user.create({
    data: {
      name: "user8",
      email: "user8@gmail.com",
      password: await bcrypt.hash("1234567890", 10),
    },
  });

  const user9 = await prisma.user.create({
    data: {
      name: "user9",
      email: "user9@gmail.com",
      password: await bcrypt.hash("1234567890", 10),
    },
  });

  const user10 = await prisma.user.create({
    data: {
      name: "user10",
      email: "user10@gmail.com",
      password: await bcrypt.hash("1234567890", 10),
    },
  });

  await jwt.sign({ id: jack.id }, process.env.JWT);
  await jwt.sign({ id: rachel.id }, process.env.JWT);
  await jwt.sign({ id: user3.id }, process.env.JWT);
  await jwt.sign({ id: user4.id }, process.env.JWT);
  await jwt.sign({ id: user5.id }, process.env.JWT);
  await jwt.sign({ id: user6.id }, process.env.JWT);
  await jwt.sign({ id: user7.id }, process.env.JWT);
  await jwt.sign({ id: user8.id }, process.env.JWT);
  await jwt.sign({ id: user9.id }, process.env.JWT);
  await jwt.sign({ id: user10.id }, process.env.JWT);

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
      upvotes: {
        connect: [{ id: jack.id }],
      },
      downvotes: {
        connect: [{ id: rachel.id }],
      },
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

  setTimeout(async () => {
    //upvoted comment
    const comment3 = await prisma.comment.create({
      data: {
        userId: rachel.id,
        postId: post1.id,
        message: "I am a root comment - upvoted",
        upvotes: {
          connect: [
            { id: user4.id },
            { id: user5.id },
            { id: user6.id },
            { id: user3.id },
          ],
        },
      },
    });

    //downvoted comment
    const comment32 = await prisma.comment.create({
      data: {
        userId: rachel.id,
        postId: post1.id,
        message: "I am a root comment -  downvoted",
        downvotes: {
          connect: [
            { id: user4.id },
            { id: user5.id },
            { id: user6.id },
            { id: user3.id },
          ],
        },
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

    await prisma.comment.create({
      data: {
        userId: rachel.id,
        postId: post1.id,
        parentId: comment3.id,
        message: "I am a nested comment22",
      },
    });
  }, 2000);

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
      parentId: comment1.id,
      message: "I am a nested comment11",
    },
  });

  await prisma.comment.create({
    data: {
      userId: rachel.id,
      postId: post1.id,
      parentId: null,
      message: "controversial comment",
      // downvotes: [user4.id, user5.id, user6.id, user3.id],
      // upvotes: [user10.id, user9.id, user8.id, user7.id, jack.id, rachel.id],
    },
  });

  //add followers
  await prisma.user.update({
    where: {
      id: jack.id,
    },
    data: {
      followedBy: {
        connect: [
          { id: user10.id },
          { id: rachel.id },
          { id: user7.id },
          { id: user3.id },
          { id: user5.id },
        ],
      },
    },
  });
}

try {
  seed();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  console.log("closing db connection");
  console.log("db connection closed");
}
