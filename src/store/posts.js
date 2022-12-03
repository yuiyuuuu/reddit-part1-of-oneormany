import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "../requests/helperFunction";

const FETCH_POSTS = "FETCH_POSTS";
const ADD_UPVOTE = "ADD_UPVOTE";
const ADD_DOWNVOTE = "ADD_DOWNVOTE";
const REMOVE_POST = "REMOVE_POST"; // NOT DELETE POST
const REMOVE_POST2 = "REMOVE_POST2";

const REMOVE_UPVOTE = "REMOVE_UPVOTE";
const REMOVE_DOWNVOTE = "REMOVE_DOWNVOTE";

const setPosts = (posts) => ({
  type: FETCH_POSTS,
  posts,
});

const addUpvote = (post) => ({
  type: ADD_UPVOTE,
  post: post.final,
  userdata: post.userdata,
});

const addDownvote = (post) => ({
  type: ADD_DOWNVOTE,
  post: post.final,
  userdata: post.userdata,
});

const hremoveUpvote = (post) => ({
  type: REMOVE_UPVOTE,
  post,
});

const hremoveDownvote = (post) => ({
  type: REMOVE_DOWNVOTE,
  post,
});

const removePost = (post) => ({
  type: REMOVE_POST,
  post,
});

const removePost2 = (post) => ({
  type: REMOVE_POST2,
  post,
});

export function fetchPosts() {
  return async (dispatch) => {
    try {
      const posts = await makeGetRequest(`posts`);
      dispatch(setPosts(posts));
    } catch (error) {
      console.log(error);
    }
  };
}

export function upvote(info) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("posts/upvote", info);
      dispatch(removePost(data));
      dispatch(addUpvote(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function downvote(info) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("posts/downvote", info);

      dispatch(removePost(data));
      dispatch(addDownvote(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeUpvote(info) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("posts/upvote/remove", info);
      dispatch(removePost2(data));
      dispatch(hremoveUpvote(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeDownvote(info) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("posts/downvote/remove", info);
      dispatch(removePost2(data));
      dispatch(hremoveDownvote(data));
    } catch (error) {
      console.log(error);
    }
  };
}

function parseDate(date) {
  const d = Date.parse(date);
  return d;
}

function sorting(a, b) {
  const aDate = parseDate(a.createdAt);
  const bDate = parseDate(b.createdAt);

  if (aDate < bDate) return 1;
  if (aDate > bDate) return -1;
  return;
}

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.posts.sort(sorting);

    case ADD_UPVOTE:
      const a = [...state, action.post].sort(sorting);
      return a;

    case ADD_DOWNVOTE:
      const b = [...state, action.post].sort(sorting);
      return b;

    case REMOVE_UPVOTE:
      const c = [...state, action.post].sort(sorting);
      return c;

    case REMOVE_DOWNVOTE:
      const d = [...state, action.post].sort(sorting);
      return d;

    case REMOVE_POST:
      return state.filter((post) => post.id !== action.post.final.id);

    case REMOVE_POST2:
      return state.filter((post) => post.id !== action.post.id);
    default:
      return state;
  }
}
