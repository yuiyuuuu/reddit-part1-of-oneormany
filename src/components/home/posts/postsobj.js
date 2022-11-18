import { v4 as uuidv4 } from "uuid";

const posts = [
  {
    id: uuidv4(),
    user: "user1",
    title: "POST 1",
    description: "POST 1 DESCRIPTION!",
    upvotes: 20,
    downvotes: 10,
    communityid: "sports",
    timeposted: new Date(),
    comments: "6.2k",
    upvotes: [],
    downvotes: [],
  },

  {
    id: uuidv4(),
    user: "user1",
    title: "POST 1",
    description: "hello my name is yingson",
    upvotes: 20,
    downvotes: 10,
    communityid: "yugioh",
    timeposted: new Date(),
    comments: "6.2k",
  },

  {
    id: uuidv4(),
    user: "user1",
    title: "POST 1",
    description: "hello my name is yingson",
    upvotes: 20,
    downvotes: 10,
    communityid: "yugioh",
    timeposted: new Date(),
    comments: "6.2k",
  },
  {
    id: uuidv4(),
    user: "user1",
    title: "POST 1",
    description: "hello my name is yingson",
    upvotes: 20,
    downvotes: 10,
    communityid: "yugioh",
    timeposted: new Date(),
    comments: "6.2k",
  },
  {
    id: uuidv4(),
    user: "user1",
    title: "POST 1",
    description: "hello my name is yingson",
    upvotes: 20,
    downvotes: 10,
    communityid: "yugioh",
    timeposted: new Date(),
    comments: "6.2k",
  },
];

export { posts as postsobj };
