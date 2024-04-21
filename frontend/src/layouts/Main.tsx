import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="MainLayout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
