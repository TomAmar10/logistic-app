import EquipmentList from "../components/EquipmentList/EquipmentList";
import { axiosInstance as axios } from "../utils/config";
import { useLoaderData } from "react-router-dom";
import Equipment from "../models/Equipment";
import store from "../store/store";
import useHttp from "../hooks/useHttp";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-state";

const Equipments = () => {
  const loaderData: any = useLoaderData();
  const eqp: Equipment[] = loaderData.data;
  const { request, data, error, isLoading } = useHttp();
  const dispatch = useDispatch();

  const complete = async () => {
    const items = store.getState().cart.items.map((i) => {
      return { equipment: i._id, amount: i.amount };
    });
    const newOrder = {
      id_user: "661d5e7d26c6d521eb3db0a0",
      order_date: new Date(),
      items,
    };
    // await request("/orders/add", "POST", newOrder);
    dispatch(cartActions.toggle(null));
  };

  return (
    <div className="Equipments">
      <h1>רשימת ציוד</h1>
      <p>ברשימה זו, תוכלו לצפות בכל הציוד הקיים, למחוק, לערוך ולהוסיף ציוד.</p>
      <EquipmentList eqp={eqp} />
      <button onClick={complete}>Complete</button>
    </div>
  );
};

export default Equipments;

export const loader = async () => {
  const response: any = await axios.get("/equipments/all");
  if (response.status !== 200) {
    return;
  }
  return response;
};
