import { axiosInstance as axios } from "../utils/config";
import { useLoaderData } from "react-router-dom";

const UserOrders = () => {
  const data = useLoaderData();
  console.log(data);
  return <div className="UserOrders"></div>;
};

export default UserOrders;

export const loader = async () => {
  const response: any = await axios.get("/orders/all");
  //   console.log(response);
  //   if (!response.ok) {
  //     return;
  //   }
  return response;
};
