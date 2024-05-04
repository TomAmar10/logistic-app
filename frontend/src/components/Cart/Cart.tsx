import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";
import "./Cart.scss";
import CartItem from "./CartItem";
import { IStore } from "../../store/store";
import { cartActions } from "../../store/cart-state";
import Equipment from "../../models/Equipment";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: IStore) => state.cart.items);

  const addItem = (data: Equipment) => {
    dispatch(cartActions.addItem({ ...data, amount: 1 }));
  };

  const removeItem = (itemId: string) => {
    dispatch(cartActions.removeItem(itemId));
  };

  return (
    <Modal>
      <div className="Cart">
        <h3>השלמת הזמנה</h3>
        <div className="cart-items">
          {items.map((item, i) => (
            <CartItem
              item={item}
              key={i}
              isLast={i === items.length - 1}
              onAddItem={addItem}
              onRemoveItem={removeItem}
            />
          ))}
        </div>
        <textarea className="cart-text"></textarea>
      </div>
    </Modal>
  );
};

export default Cart;
