import Equipment from "../../models/Equipment";
import "./CartItem.scss";

interface props {
  item: Equipment;
  isLast: boolean;
  onAddItem: Function;
  onRemoveItem: Function;
}

const CartItem = (props: props) => {
  const { name, description, amount, image, _id } = props.item;
  const isLast = props.isLast;

  return (
    <div className={`CartItem ${isLast ? "last" : ""}`}>
      <div className="item-details">
        <img
          src={
            image ||
            "https://cdn.shopify.com/s/files/1/1186/5476/files/BLACK_5_3026eaf6-a1fe-44e0-b92b-80727fa2a1db_1024x1024.jpg?v=1568123300"
          }
          alt={name}
        />
        <div>
          <h5>{name}</h5>
          <p>{description}</p>
        </div>
      </div>
      <div className="amount-control">
        <button onClick={() => props.onAddItem(props.item)}>+</button>
        <span>{amount}</span>
        <button onClick={() => props.onRemoveItem(_id)}>-</button>
      </div>
    </div>
  );
};

export default CartItem;
