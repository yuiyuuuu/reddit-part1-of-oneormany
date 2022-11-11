import { Route, Routes, BrowserRouter } from "react-router-dom";
import Posts from "./components/Posts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
