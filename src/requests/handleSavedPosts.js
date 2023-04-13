import { changeSaved } from "../store/auth";
import { addAlert } from "../globalcomponents/alerts/addAlertsFunctions";

function handleSaved(addOrRemove, which, postid, userid, dispatch) {
  const obj = {
    addOrRemove: addOrRemove,
    which: which,
    postid: postid,
    userid: userid,
  };

  dispatch(changeSaved(obj)).then(() => {
    addAlert(
      addOrRemove === "add"
        ? "Post saved successfully"
        : "Post unsaved successfully",
      dispatch
    );
  });
}

export { handleSaved };
