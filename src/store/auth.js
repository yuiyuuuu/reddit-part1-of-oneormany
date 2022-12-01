import { makeGetRequest, makePostRequest } from "../requests/helperFunction";

const AUTH = "AUTH";

const setAuth = (auth) => ({
  type: AUTH,
  auth,
});

export function getLocalData() {
  const token = window.localStorage.getItem("token");

  return async (dispatch) => {
    try {
      if (token) {
        const user = await makeGetRequest("authentication/getlocaldata", {
          headers: {
            authorization: token,
          },
        });

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

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH:
      return action.auth;
    default:
      return state;
  }
}
