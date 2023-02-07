const SET_HREFPATH = "SET_HREFPATH";

const dispathHrefPath = (href) => ({
  type: SET_HREFPATH,
  href,
});

export function setHrefPath(bool) {
  return (dispatch) => {
    dispatch(dispathHrefPath(bool));
  };
}

//sample state : {href:'/hi', func: function, parameters: 'function paramteres'}
export default function (state = {}, action) {
  switch (action.type) {
    case SET_HREFPATH:
      return action.href;
    default:
      return state;
  }
}
