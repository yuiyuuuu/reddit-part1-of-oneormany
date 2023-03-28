const SET_SELECTED_USER = "SET_SELECTED_USER";
import { makeGetRequest } from "../../requests/helperFunction";

const dispatchSetSelectedUser = (user) => ({
  type: SET_SELECTED_USER,
  user,
});

export function setSelectedUser(name) {
  return async (dispatch) => {
    try {
      const data = await makeGetRequest(`users/${name}`);
      dispatch(dispatchSetSelectedUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SELECTED_USER:
      return action.user;
    default:
      return state;
  }
}
