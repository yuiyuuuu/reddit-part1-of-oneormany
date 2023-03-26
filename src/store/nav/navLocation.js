const SET_NAV_LOCATION = "SET_NAV_LOCATION";

const dispatchSetNavLocation = (value) => ({
  type: SET_NAV_LOCATION,
  value,
});

export function setNavLocation(value) {
  return (dispatch) => {
    dispatch(dispatchSetNavLocation(value));
  };
}

//if state.image is not null, we will use the ojbect to render the correct svg
//if it is null, then we know its a community image or user image that must be loaded

export default function (state = {}, action) {
  switch (action.type) {
    case SET_NAV_LOCATION:
      return action.value;
    default:
      return state;
  }
}
