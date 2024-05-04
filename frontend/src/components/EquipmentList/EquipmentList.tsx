import Equipment from "../../models/Equipment";
import SingleEquipment from "../SingleEquipment/SingleEquipment";
import "./EquipmentList.scss";
import store from "../../store/store";

interface props {
  eqp: Equipment[];
}

const EquipmentList = (props: props) => {
  const items = store.getState().cart.items;
  const equipments = props.eqp.map((eq) => {
    const existItem = items.find((i) => {
      return i._id === eq._id;
    });
    if (existItem) return existItem;
    else return eq;
  });

  return (
    <div className="EquipmentList">
      {equipments.map((eq, i) => (
        <SingleEquipment data={eq} key={i} />
      ))}
    </div>
  );
};

export default EquipmentList;
