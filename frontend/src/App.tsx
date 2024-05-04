import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/Main";
import AuthLayout from "./layouts/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import UserOrders, { loader as ordersLoader } from "./pages/UserOrders";
import NewOrder, { loader as itemsLoader } from "./pages/NewOrder";
import Equipments, { loader as EqpLoader } from "./pages/Equipments";
import Footer from "./components/Footer/Footer";
import Admin from "./pages/Admin";
import { Provider } from "react-redux";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "new-order", element: <NewOrder />, loader: itemsLoader },
      { path: "my-orders", element: <UserOrders />, loader: ordersLoader },
      { path: "all-equipments", element: <Equipments />, loader: EqpLoader },
      { path: "admin", element: <Admin /> },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Footer />
    </>
  );
}

export default App;
