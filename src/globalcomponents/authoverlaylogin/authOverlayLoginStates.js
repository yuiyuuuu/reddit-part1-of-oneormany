const SET_AOLSTATE = "SET_AOLSTATE";
const CLEAR_AOL = "CLEAR_AOL";

export const dispatchSetAOL = (state) => ({
  type: SET_AOLSTATE,
  state,
});

export const clearAOL = (state = { display: false }) => ({
  type: CLEAR_AOL,
  state,
});

export default function (state = { display: false }, action) {
  switch (action.type) {
    case SET_AOLSTATE:
      return action.state;
    case CLEAR_AOL:
      return action.state;
    default:
      return state;
  }
}
