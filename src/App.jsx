import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Submit from "./components/submit/Submit";
import Nav from "./components/nav/Nav";
import Posts from "./components/Posts";
import SinglePost from "./components/SinglePost";
import "./index.scss";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/posts' element={<Posts />} />
        <Route exact path='/posts/:id' element={<SinglePost />} />
        <Route exact path='/submit' element={<Submit />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
