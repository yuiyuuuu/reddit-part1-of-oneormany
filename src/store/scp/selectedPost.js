import { makePostRequest } from "../../requests/helperFunction";

const SET_SELECTEDPOST_SINGLE = "SET_SELECTEDPOST_SINGLE";
const HANDLE_ADDCOMMENT = "HANDLE_ADDCOMMENT";

const dispatchSetSelectedPost = (post) => ({
  type: SET_SELECTEDPOST_SINGLE,
  post,
});

const dispatchAddComment = (post) => ({
  type: HANDLE_ADDCOMMENT,
  post,
});

export function setSelectedPost(post) {
  return (dispatch) => {
    dispatch(dispatchSetSelectedPost(post));
  };
}

export function handleAddComment(obj) {
  return async (dispatch) => {
    try {
      const data = await makePostRequest("communities/comment/add", obj);
      dispatch(dispatchAddComment(data.post));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SELECTEDPOST_SINGLE:
      return action.post;

    case HANDLE_ADDCOMMENT:
      // const y = state.posts
      //   .map((post) => (post.id === action.post.id ? action.post : post))
      //   .sort(sorting);
      // return { ...state, posts: y };

      return action.post;
    default:
      return state;
  }
}
