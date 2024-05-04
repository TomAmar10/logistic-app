import { axiosInstance as axios } from "../utils/config";
import { useLoaderData } from "react-router-dom";

const NewOrder = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="NewOrder">
      <h1>עמוד הזמנת ציוד</h1>
      <div className="items-container"></div>
    </div>
  );
};

export default NewOrder;

export const loader = async () => {
  const response: any = await axios.get("/equipments/all");
  if (response.status !== 200) {
    return;
  }
  return response;
};
