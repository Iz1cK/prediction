import logo from "./logo.svg";
import "./App.css";
import { useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";

function App() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null)

  const handleLogout = (e) => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home accessToken={accessToken} />} />
        <Route path="/login" element={<Authentication setAccessToken={setAccessToken} />} />
      </Routes>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
