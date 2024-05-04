import "./SingleEquipment.scss";
import Equipment from "../../models/Equipment";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-state";
import { useState } from "react";

interface props {
  data: Equipment;
}

const SingleEquipment = (props: props) => {
  const isAdmin = false;
  const data = props.data;
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(data.amount || 0);

  const addItem = () => {
    dispatch(cartActions.addItem({ ...data, amount: 1 }));
    setAmount((prev) => prev + 1);
  };

  const removeItem = () => {
    dispatch(cartActions.removeItem(data._id));
  };

  return (
    <div className={`SingleEquipment ${amount > 0 ? "added" : ""}`}>
      <div className="img-container">
        <img
          src="https://cdn.shopify.com/s/files/1/1186/5476/files/BLACK_5_3026eaf6-a1fe-44e0-b92b-80727fa2a1db_1024x1024.jpg?v=1568123300"
          alt={data.name}
        />
      </div>
      <div className="details">
        <h4>{data.name}</h4>
        <p>{data.description}</p>
      </div>
      <div className="buttons">
        {isAdmin ? (
          <>
            <button className="blue-btn">ערוך</button>
            <button className="red-btn">מחק</button>
          </>
        ) : (
          <>
            {amount < 1 ? (
              <button className="blue-btn first-add" onClick={addItem}>
                הוסף להזמנה
              </button>
            ) : (
              <>
                <button className="blue-btn" onClick={addItem}>
                  +
                </button>
                <span className="amount-span">{amount}</span>
                <button className="red-btn" onClick={removeItem}>
                  -
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleEquipment;
