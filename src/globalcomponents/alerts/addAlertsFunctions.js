import { v4 as uuidv4 } from "uuid";
import {
  dispatchAddToAlertsQueue,
  dispatchRemoveToAlertsQueue,
} from "../../store/alerts/alerts";
import $ from "jquery";

export function addAlert(message, dispatch) {
  const id = uuidv4();
  dispatch(dispatchAddToAlertsQueue({ id: id, message: message }));

  setTimeout(() => {
    dispatch(dispatchRemoveToAlertsQueue(id));
  }, 5000);
}
