import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Header from "./components/Header";

function App() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || null
  );

  const handleLogout = (e) => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" exact element={<Home accessToken={accessToken} />} />
        <Route
          path="/login"
          element={<Authentication setAccessToken={setAccessToken} />}
        />
      </Routes>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
