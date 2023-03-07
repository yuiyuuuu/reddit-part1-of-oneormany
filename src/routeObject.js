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

const routeObject = {
  home: Home,
  submit: Submit,
  singleCommunity: SingleCommunity,
  null: SingleCommunityPostNotOverlay,
};

export default routeObject;
