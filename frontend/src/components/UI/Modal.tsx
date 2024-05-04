import { useDispatch } from "react-redux";
import "./Modal.scss";
import { ReactNode } from "react";
import { cartActions } from "../../store/cart-state";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const dispatch = useDispatch();
  const removeModal = () => dispatch(cartActions.toggle(null));

  return (
    <>
      <div className="modal-bg" onClick={removeModal}></div>
      <div className="Modal">{children}</div>
    </>
  );
};

export default Modal;
