import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home";
import NotFound from "./pages/NotFound";
// import NavigationBar from "./components/navigation_bar/NavigationBar.tsx.old";
import NewNavber from "./components/navigation_bar/NewNavber";
import GamePage from "./pages/game/GamePage";

function App() {
  const location = useLocation();
  const excludedRoutesFromNavbar = ["/", "/Login", "/Register"];

  return (
    <>
      {!excludedRoutesFromNavbar.includes(location.pathname) ? (
        <NewNavber />
      ) : null}
      <Routes>
        <Route path="/" Component={Login}></Route>
        <Route path="/Login" Component={Login}></Route>
        <Route path="/Register" Component={Register}></Route>
        <Route path="/Home" Component={Home}></Route>
        <Route path="/Game/:gameID" Component={GamePage}></Route>
        <Route path="*" Component={NotFound}></Route>
      </Routes>
    </>
  );
}

export default App;
