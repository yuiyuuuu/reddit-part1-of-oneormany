import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "../requests/helperFunction";

const FETCH_POSTS = "FETCH_POSTS";
const ADD_UPVOTE = "ADD_UPVOTE";
const ADD_DOWNVOTE = "ADD_DOWNVOTE";
const REMOVE_POST = "REMOVE_POST";

const REMOVE_UPVOTE = "REMOVE_UPVOTE";
const REMOVE_DOWNVOTE = "REMOVE_DOWNVOTE";

const CLEAR_POSTSTATE = "CLEAR_POSTSTATE";

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
  post: post.final,
  userdata: post.userdata,
});

const hremoveDownvote = (post) => ({
  type: REMOVE_DOWNVOTE,
  post: post.final,
  userdata: post.userdata,
});

const removePost = (post) => ({
  type: REMOVE_POST,
  post,
});

const dispatchClearPosts = () => ({
  type: CLEAR_POSTSTATE,
});

//fetch all posts
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

//fetch a community post
export function fetchSpecificCommunityPosts(id) {
  return async (dispatch) => {
    try {
      const data = await makeGetRequest(`posts/community/${id}`);
      if (data === "no posts") {
        return data;
      }
      dispatch(setPosts(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function upvote(info) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("posts/vote", { ...info, which: "up" });
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
      const data = await makePutRequest("posts/vote", {
        ...info,
        which: "down",
      });

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
      const data = await makePutRequest("posts/vote", {
        ...info,
        which: "up-remove",
      });
      dispatch(removePost(data));
      dispatch(hremoveUpvote(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeDownvote(info) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("posts/vote", {
        ...info,
        which: "down-remove",
      });
      dispatch(removePost(data));
      dispatch(hremoveDownvote(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearPostState() {
  return (dispatch) => {
    dispatch(dispatchClearPosts);
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

    case CLEAR_POSTSTATE:
      return [];
    default:
      return state;
  }
}
