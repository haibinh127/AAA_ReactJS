import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Home from "./pages/Home/Home";
import Create from "../src/pages/Create/create";
import Detail from "./pages/Detail/detail";
import Bookmark from "./pages/Bookmark/Bookmark";
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}> </Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/bookmark/:id" element={<Bookmark />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
