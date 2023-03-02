const SET_AOSSTATE = "SET_AOSSTATE";
const CLEAR_AOS = "CLEAR_AOS";

export const dispatchSetAOS = (state) => ({
  type: SET_AOSSTATE,
  state,
});

export const clearAOS = (state = { display: false, which: "" }) => ({
  type: CLEAR_AOS,
  state,
});

export default function (state = { display: false, which: "vote" }, action) {
  switch (action.type) {
    case SET_AOSSTATE:
      return action.state;
    case CLEAR_AOS:
      return action.state;
    default:
      return state;
  }
}
