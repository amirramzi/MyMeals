//render all cart items
//display total amount
//order button
import React, { useContext, useState } from "react";
import CartContext from "../../store/Cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    try {
      const response = await fetch(
        "https://mymeals-25e79-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderItem: cartCtx.items,
          }),
        }
      );
      if (response.ok) {
        setIsSubmiting(false);
        setIsSubmit(true);
        cartCtx.clearCart();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item?.id}
          name={item?.name}
          amount={item?.amount}
          price={item?.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const moadalActions = (
    <div className={classes.actions}>
      <button onClick={props?.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && moadalActions}
    </>
  );
  const isSubmitingModalContent = <p>Sending order data ...</p>;
  const didSubmitModalContent = (
    <>
      <p>Success Fully sent the order</p>
      <div className={classes.actions}>
        <button onClick={props?.onClose} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !isSubmit && cartModalContent}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && isSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
