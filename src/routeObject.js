import Home from "./components/home/Home";
import Submit from "./components/submit/Submit";
import Nav from "./components/nav/Nav";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import SingleCommunity from "./components/communities/SingleCommunity";
import Communities404 from "./components/communities/Communities404";
import CreateCommunityOverlay from "./components/communities/CreateCommunityOverlay";
import MainTools from "./components/communities/ModeratorTools/MainTools";
import DiscardChanges from "./discardChanges/DiscardChanges";
import AuthOverlaySignup from "./globalcomponents/authoverlaysignup/AuthOverlaySignup";
import AuthOverlayLogin from "./globalcomponents/authoverlaylogin/AuthOverlayLogin";
import SingleCommunityPostNotOverlay from "./components/communities/SingleCommunityPost/SingleCommunityPostNotOverlay/SingleCommunityPostNotOverlay";

//the only paths that belong here are the possible paths where singlepost can be an overlay, for example home u can click on a post and it will show as an overlay
//other paths should not be here
const routeObject = {
  home: Home,
  singleCommunity: SingleCommunity,
  null: SingleCommunityPostNotOverlay,
};

export default routeObject;
