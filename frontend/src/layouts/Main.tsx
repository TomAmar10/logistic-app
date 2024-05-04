import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Cart from "../components/Cart/Cart";
import { useSelector } from "react-redux";
import { IStore } from "../store/store";

const MainLayout = () => {
  const isVisible = useSelector((state: IStore) => state.cart.isVisible);
  return (
    <div className="MainLayout">
      <Navbar />
      <Outlet />
      {isVisible && <Cart />}
    </div>
  );
};

export default MainLayout;
