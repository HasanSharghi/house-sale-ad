import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import NewAd from "./pages/New-Ad/New-Ad";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Ad from "./pages/Ad/Ad";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useLocation } from "react-router-dom";
import MyAd from "./pages/My-Ad/My-ad";
import NotFound from "./components/Home/Not-Found/NotFound";
import { useState, useEffect } from "react";
import ProtectedRoutes from "./components/Home/ProtectedRoutes/ProtectedRoutes";
import "../src/assets/styles/main.css";

function App() {
  const navigate = useNavigate();
  let location = useLocation();
  let param = location.pathname.slice(3);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3004/users");
      const jsonData = await response.json();
      setUser(jsonData);
    };
    fetchData();
  }, []);
  console.log(location);

  return (
    <div className="font-IRANYekan flex flex-col bg-white  h-[100vh] justify-between">
      <div className="">
        <div
          className={
            location.pathname === "/" ||
            location.pathname === "/my-ad" ||
            location.pathname === "/new-ad" ||
            location.pathname === `/ad${param}`
              ? "block"
              : "hidden"
          }
        >
          {" "}
          <div className="">
            <Navbar />
          </div>
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/my-ad" element={<MyAd />} />
            <Route path="/new-ad" element={<NewAd />} />
            <Route path="/ad/:id" element={<Ad />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
      <div
        className={
          location.pathname === "/" ||
          location.pathname === "/my-ad" ||
          location.pathname === "/new-ad" ||
          location.pathname === `/ad${param}`
            ? "block "
            : "hidden"
        }
      >
        <Footer />
      </div>
    </div>
  );
}

export default App;
