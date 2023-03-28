const SET_LEFTNAV_STATE_nologin = "SET_LEFTNAV_STATE_nologin";

export const dispatchSetLnnl = (state) => ({
  type: SET_LEFTNAV_STATE_nologin,
  state,
});

//display = false = no display
//set true for now for testing, will change to false later
export default function (state = false, action) {
  switch (action.type) {
    case SET_LEFTNAV_STATE_nologin:
      return action.state;
    default:
      return state;
  }
}
