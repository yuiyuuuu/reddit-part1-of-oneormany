import { v4 as uuidv4 } from "uuid";
import {
  dispatchAddToAlertsQueue,
  dispatchRemoveToAlertsQueue,
} from "../../store/alerts/alerts";

import $ from "jquery";
import gsap from "gsap";

export function addAlert(message, dispatch) {
  const id = uuidv4();
  dispatch(dispatchAddToAlertsQueue({ id: id, message: message }));
}
