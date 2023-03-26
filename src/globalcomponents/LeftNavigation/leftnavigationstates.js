const SET_LEFTNAV_STATE = "SET_LEFTNAV_STATE";

export const dispatchSetLeftNavState = (state) => ({
  type: SET_LEFTNAV_STATE,
  state,
});

function check() {
  //need to change to boolean, localstorage can only store strings
  const item = window.localStorage.getItem("lnstate") === "true";

  if (window.innerWidth < 1251) {
    return false;
  }

  //if item is null, it means user is first time in this browser, so we will set it to true
  //if it is false, then we do nothing since original state is false anyways
  if (item == null) {
    return true;
  }

  if (item == false) {
    return false;
  }

  return true;
}

//display = false = no display
//set true for now for testing, will change to false later
export default function (state = check(), action) {
  switch (action.type) {
    case SET_LEFTNAV_STATE:
      return action.state;
    default:
      return state;
  }
}
