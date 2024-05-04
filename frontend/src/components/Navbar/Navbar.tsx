import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.scss";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 50);
    });
  }, []);

  return (
    <div
      className={`Navbar ${isScrolled ? "scrolled" : ""} ${
        isHomePage ? "" : "not-home"
      }`}
    >
      <div className="Navbar-right">
        <img src={logo} alt="גדוד 373" />
        <span>לוגיסטיקה 373</span>
      </div>
      <div className="Navbar-center">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          דף בית
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          אודות
        </NavLink>
        <NavLink
          to={"/new-order"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          הזמנת ציוד
        </NavLink>
        <NavLink
          to={"/my-orders"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          צפיה בהזמנות
        </NavLink>
        <NavLink
          to={"/all-equipments"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          כל הציוד
        </NavLink>
        <NavLink
          to={"/admin"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          ניהול אדמין
        </NavLink>
      </div>
      <div className="Navbar-left">
        <NavLink to={"/login"}>התנתק</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
