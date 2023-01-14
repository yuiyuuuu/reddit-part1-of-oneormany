import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "../requests/helperFunction";

const AUTH = "AUTH";
const ADD_COMMUNITY = "ADD_COMMUNITY";

const setAuth = (auth) => ({
  type: AUTH,
  auth,
});

const addACommunity = (user) => ({
  type: ADD_COMMUNITY,
  user,
});

export function getLocalData() {
  const token = window.localStorage.getItem("token");

  console.log(token, "tokennnnn");
  return async (dispatch) => {
    try {
      if (token) {
        const user = await makeGetRequest("authentication/getlocaldata", {
          headers: {
            authorization: token,
          },
        });

        console.log("tokenrannnn");
        dispatch(setAuth(user));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function authenticate(username, password) {
  return async (dispatch) => {
    try {
      const data = await makePostRequest("authentication/login", {
        username: username,
        password: password,
      });

      if (data === "wrongpassword") {
        return data;
      }
      dispatch(setAuth(data));
      return "successful";
    } catch (error) {
      console.log(error);
    }
  };
}

export function signup(object) {
  return async (dispatch) => {
    try {
      const data = await makePostRequest("authentication/signup", object);

      window.localStorage.setItem("token", data.jwt);
      return dispatch(setAuth(data.user));
    } catch (error) {
      console.log(error);
    }
  };
}

export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch(setAuth({}));
  };
}

export function addCommunity(info) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/join", info);
      dispatch(addACommunity(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH:
      return action.auth;
    case ADD_COMMUNITY:
      return action.user;
    default:
      return state;
  }
}
