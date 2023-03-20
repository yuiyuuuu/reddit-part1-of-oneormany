const ADD_TO_ALERTS_QUEUE = "ADD_TO_ALERTS_QUEUE";
const REMOVE_ALERT_FROM_QUEUE = "REMOVE_ALERT_FROM_QUEUE";

export const dispatchAddToAlertsQueue = (value) => ({
  type: ADD_TO_ALERTS_QUEUE,
  value,
});

export const dispatchRemoveToAlertsQueue = (value) => ({
  type: REMOVE_ALERT_FROM_QUEUE,
  value,
});

export default function (state = [], action) {
  switch (action.type) {
    case ADD_TO_ALERTS_QUEUE:
      return [...state, action.value];

    case REMOVE_ALERT_FROM_QUEUE:
      return state.filter((v) => v.id !== action.value);
    default:
      return state;
  }
}
