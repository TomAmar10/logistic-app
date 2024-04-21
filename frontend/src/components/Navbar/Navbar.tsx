import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.scss";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 50);
    });
  }, []);

  return (
    <div className={`Navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="Navbar-right">
        <img src={logo} alt="גדוד 373" />
        <span>לוגיסטיקה 373</span>
      </div>
      <div className="Navbar-center">
        <NavLink to={""}>דף בית</NavLink>
        <NavLink to={""}>אודות</NavLink>
        <NavLink to={""}>בקשה לציוד</NavLink>
        <NavLink to={""}>צפיה בבקשות</NavLink>
      </div>
      <div className="Navbar-left">התנתק</div>
    </div>
  );
};

export default Navbar;
